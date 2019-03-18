interface NavItem {
  path: string;
  name: string;
}

export const navItems: NavItem[] = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/clothing',
    name: 'Clothing',
  },
  {
    path: '/music',
    name: 'Music',
  },
  {
    path: '/contact',
    name: 'Contact',
  },
];
