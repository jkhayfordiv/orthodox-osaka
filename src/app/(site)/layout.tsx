import React from 'react';
import { SiteShell } from '../../components/shared/SiteShell';

export default function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
