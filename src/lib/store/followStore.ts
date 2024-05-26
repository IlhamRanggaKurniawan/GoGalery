import { create } from "zustand"
import { follow, isFollowing, unfollow } from "../actions/follow";
import { createSelectors } from "../createSelectors";

type TFollowStore = {
    isFollow: boolean;
    followId: number;
    checkFollow: (params: { followerId: number; followingId: number }) => Promise<void>;
    toggleFollow: (params: { followerId: number; followingId: number }) => Promise<void>;
}



export const useFollowStore = createSelectors(create<TFollowStore>()((set) => ({
    isFollow: false,
    followId: 0,
    checkFollow: async ({ followerId, followingId }) => {
        const { data } = await isFollowing({ followerId, followingId })

        if (data) {
            set({ followId: data.id, isFollow: true })
        } else {
            set({ isFollow: false })
        }
    },


    toggleFollow: async ({ followerId, followingId }) => {
        const { isFollow, followId } = useFollowStore.getState()

        if (isFollow) {
            await unfollow({ id: followId })
            set({ isFollow: false, followId: 0 })
        } else {
            const { data } = await follow({ followerId, followingId })
            if (data) {
                set({ followId: data.id, isFollow: true })
            }
        }
    },

})))