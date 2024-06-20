import { create } from "zustand"
import { createSelectors } from "../createSelectors";
import { isLike, likeContent, unlikeContent } from "../actions/like";

type TLikeStore = {
    checkLike: (params: { userId: number; contentId: number }) => Promise<{ data?: { id: number }, status: boolean }>;
    like: (params: { userId: number; contentId: number }) => Promise<void>;
    unlike: (params: { id: number }) => Promise<void>;
}

export const useLikeStore = createSelectors(create<TLikeStore>()((set, get) => ({
    checkLike: async ({ userId, contentId }) => {
        const { data, status } = await isLike({ userId, contentId })

        return {
            data,
            status
        }
    },

    like: async ({ userId, contentId }) => {
        await likeContent({ userId, contentId })
    },

    unlike: async ({ id }) => {
        await unlikeContent({ id })
    }

})))