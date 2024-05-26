import { create } from 'zustand';
import { getUserProfile } from '@/lib/actions/user';
import { createSelectors } from '../createSelectors';

type UserProfile = {
  id: number;
  username: string;
  _count: {
    followers: number;
    following: number;
    content: number;
  };
  content: Array<{
    id: number;
    caption: string;
    url: string;
    createdAt: Date;
  }>;
};

type TProfileStore = {
  data: UserProfile | null;
  error: string | null;
  getUserData: (username: string) => Promise<void>;
};

export const useProfileStore = createSelectors(create<TProfileStore>()((set) => ({
    data: null,
    error: null,
    getUserData: async(username) => {
        const {data, error} = await getUserProfile(username)
        set({data: data, error: error})
    },  
})))