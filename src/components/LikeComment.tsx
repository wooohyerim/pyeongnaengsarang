import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLikesInfo, addLike, removeLike } from "@/api/comment";
import { FaRegHeart } from "react-icons/fa";
import { auth } from "@/firebase/firebase";

interface PropValues {
  postId: string | undefined;
  comment_id: string | undefined;
}

const LikeComment = ({ postId, comment_id }: PropValues) => {
  const user = auth.currentUser;
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["commentLikes", postId, comment_id],
    queryFn: () =>
      getLikesInfo(postId || "", user?.uid || "", comment_id || ""),
  });

  const liked = data?.liked ?? false;
  const likeCount = data?.likeCount ?? 0;

  const addLikeMutation = useMutation({
    mutationFn: (comment_id: string) =>
      addLike(postId || "", user?.uid || "", comment_id),
    onMutate: async (comment_id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["commentLikes", postId, comment_id],
      });

      const previous = queryClient.getQueryData([
        "commentLikes",
        postId,
        comment_id,
      ]);

      queryClient.setQueryData(
        ["commentLikes", postId, comment_id],
        (old: any) => ({
          ...old,
          liked: true,
          likeCount: old.likeCount + 1,
        })
      );

      return { previous };
    },
    onError: (_err, comment_id, context) => {
      queryClient.setQueryData(
        ["commentLikes", postId, comment_id],
        context?.previous
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentLikes", postId, comment_id],
      });
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: (comment_id: string) =>
      removeLike(postId || "", user?.uid || "", comment_id),
    onMutate: async (comment_id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["commentLikes", postId, comment_id],
      });

      const previous = queryClient.getQueryData([
        "commentLikes",
        postId,
        comment_id,
      ]);

      queryClient.setQueryData(
        ["commentLikes", postId, comment_id],
        (old: any) => ({
          ...old,
          liked: false,
          likeCount: old.likeCount - 1,
        })
      );

      return { previous };
    },
    onError: (_err, comment_id, context) => {
      queryClient.setQueryData(
        ["commentLikes", postId, comment_id],
        context?.previous
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentLikes", postId, comment_id],
      });
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });

  const handleLike = (comment_id: string) => {
    if (liked) {
      removeLikeMutation.mutate(comment_id);
    } else {
      addLikeMutation.mutate(comment_id);
    }
  };

  return (
    <div className="flex items-center gap-1 ">
      <FaRegHeart
        style={{ color: "#e5503c", cursor: "pointer" }}
        onClick={() => handleLike(comment_id || "")}
        size={10}
      />

      <span className="text-[12px] text-[#e5503c]">
        {likeCount > 0 ? likeCount : 0}
      </span>
    </div>
  );
};

export default LikeComment;
