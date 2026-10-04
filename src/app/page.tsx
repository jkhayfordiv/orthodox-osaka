import { HomeWebsiteView } from '../components/website/HomeWebsiteView';
import { SiteShell } from '../components/shared/SiteShell';

export default function HomePage() {
  return (
    <SiteShell>
      <HomeWebsiteView />
    </SiteShell>
  );
}
