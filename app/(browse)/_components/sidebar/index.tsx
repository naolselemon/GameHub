import Recommended, { RecommendedSkeleton } from './recommended';
import Toggle from './toggle';
import { Wrapper } from './wrapper';
import { getRecommended } from '@/lib/recommended-service';
import { getFollowUsers } from '@/lib/follow-service';
import { Following, FollowingSkeleton } from './following';
const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowUsers();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
