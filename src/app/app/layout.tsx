import React from 'react';
import { SiteShell } from '../../components/shared/SiteShell';

export default function ParishAppLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
