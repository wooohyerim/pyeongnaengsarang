import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { auth } from "@/firebase/firebase";
import { addLike, removeLike, getLikesInfo } from "@/api/post";

interface PropType {
  postId: string | undefined;
}

const LikeFeed = ({ postId }: PropType) => {
  const user = auth.currentUser;
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (postId && user) {
      getLikesInfo(postId, user.uid).then(({ liked, likeCount }) => {
        setLiked(liked);
        setLikeCount(likeCount);
      });
    }
  }, [postId, user]);

  const addLikeMutation = useMutation({
    mutationFn: () => addLike(postId || "", user?.uid || ""),
    onSuccess: () => {
      setLiked(true);
      setLikeCount(likeCount + 1);
      queryClient.invalidateQueries({ queryKey: ["postLikes", postId] });
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: () => removeLike(postId || "", user?.uid || ""),
    onSuccess: () => {
      setLiked(false);
      setLikeCount(likeCount - 1);
      queryClient.invalidateQueries({ queryKey: ["postLikes", postId] });
    },
  });

  const handleLike = () => {
    if (liked) {
      removeLikeMutation.mutate();
    } else {
      addLikeMutation.mutate();
    }
  };

  return (
    <div className="flex items-center gap-1 px-3 py-1 border rounded-xl ">
      {liked ? (
        <FaHeart
          style={{ color: "#e5503c", cursor: "pointer" }}
          onClick={handleLike}
        />
      ) : (
        <FaRegHeart
          style={{ color: "#e5503c", cursor: "pointer" }}
          onClick={handleLike}
        />
      )}
      <span className="text-[14px] text-[#e5503c]">
        {likeCount > 0 ? likeCount : 0}
      </span>
    </div>
  );
};

export default LikeFeed;