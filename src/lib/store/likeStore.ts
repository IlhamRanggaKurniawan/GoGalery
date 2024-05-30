import { create } from "zustand"
import { createSelectors } from "../createSelectors";
import { isLike, likeContent, unlikeContent } from "../actions/like";

type TLikeStore = {
    checkLike: (params: { userId: number; contentId: number }) => Promise<boolean>;
    like: (params: { userId: number; contentId: number }) => Promise<void>;
    unlike: (params: { userId: number; contentId: number }) => Promise<void>;
}

export const useLikeStore = createSelectors(create<TLikeStore>()((set, get) => ({
    checkLike: async ({ userId, contentId }) => {
        const { data } = await isLike({ userId, contentId })

        if (!data) {
            return false
        }

        return true
    },

    like: async ({ userId, contentId }) => {
        await likeContent({ userId, contentId })
    },

    unlike: async ({ userId, contentId }) => {
        await unlikeContent({ userId, contentId })
    }

})))