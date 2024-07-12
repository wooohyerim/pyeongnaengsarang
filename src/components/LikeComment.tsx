import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getLikesInfo, addLike, removeLike } from "@/api/comment";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { auth } from "@/firebase/firebase";

interface PropValues {
  postId: string | undefined;
  comment_id: string | undefined;
}

const LikeComment = ({ postId, comment_id }: PropValues) => {
  const user = auth.currentUser;
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchLikesInfo = async (comment_id: string) => {
      if (postId && user && comment_id) {
        const { liked, likeCount } = await getLikesInfo(
          postId,
          user.uid,
          comment_id
        );
        setLiked(liked);
        setLikeCount(likeCount);
      }
    };
    fetchLikesInfo(comment_id || "");
  }, [postId, user, comment_id]);

  const addLikeMutation = useMutation({
    mutationFn: (comment_id: string) =>
      addLike(postId || "", user?.uid || "", comment_id),
    onSuccess: () => {
      setLiked(true);
      setLikeCount((count) => count + 1);
      queryClient.invalidateQueries({ queryKey: ["postLikes", postId] });
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: (comment_id: string) =>
      removeLike(postId || "", user?.uid || "", comment_id),
    onSuccess: () => {
      setLiked(false);
      setLikeCount((count) => count - 1);
      queryClient.invalidateQueries({ queryKey: ["postLikes", postId] });
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
      {likeCount > 0 && liked ? (
        <FaHeart
          style={{
            color: "#e5503c",
            cursor: "pointer",
          }}
          onClick={() => handleLike(comment_id || "")}
          size={10}
        />
      ) : (
        <FaRegHeart
          style={{ color: "#e5503c", cursor: "pointer" }}
          onClick={() => handleLike(comment_id || "")}
          size={10}
        />
      )}
      <span className="text-[12px] text-[#e5503c]">
        {likeCount > 0 ? likeCount : 0}
      </span>
    </div>
  );
};

export default LikeComment;
