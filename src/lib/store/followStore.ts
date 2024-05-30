import { create } from "zustand"
import { countFollow, follow, isFollowing, unfollow } from "../actions/follow";
import { createSelectors } from "../createSelectors";

type TFollowStore = {
    follower: number,
    following: number,
    isFollow: boolean;
    followId: number;
    countUserFollow: (params: { userId : number}) => Promise<void>;
    checkFollow: (params: { followerId: number; followingId: number }) => Promise<void>;
    toggleFollow: (params: { followerId: number; followingId: number }) => Promise<void>;
}



export const useFollowStore = createSelectors(create<TFollowStore>()((set,get) => ({
    follower: 0,
    following: 0,
    isFollow: false,
    followId: 0,

    countUserFollow: async ({userId}) => {
        const { follower, following } = await countFollow({userId})
        set({follower, following})
    },
    checkFollow: async ({ followerId, followingId }) => {
        const { data } = await isFollowing({ followerId, followingId })

        if (data) {
            set({ followId: data.id, isFollow: true })
        } else {
            set({ isFollow: false })
        }
    },


    toggleFollow: async ({ followerId, followingId }) => {
        const { isFollow, followId, follower } = get()

        if (isFollow) {
            await unfollow({ id: followId })
            set({ isFollow: false, followId: 0, follower: follower - 1})
        } else {
            const { data } = await follow({ followerId, followingId })
            if (data) {
                set({ followId: data.id, isFollow: true, follower: follower + 1 })
            }
        }
    },

})))