// MenuContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts';
}

interface MenuContextType {
  menu: Dish[];
  addDish: (dish: Dish) => void;
  removeDish: (id: string) => void;
}

export const MenuContext = createContext<MenuContextType>({
  menu: [],
  addDish: () => {},
  removeDish: () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menu, setMenu] = useState<Dish[]>([
    { id: '1', name: 'Deviled Eggs', description: 'Classic appetizer', price: 55, category: 'starters' },
    { id: '2', name: 'Butter Chicken', description: 'Creamy spiced dish', price: 169, category: 'mains' },
    { id: '3', name: 'Cheesecake', description: 'Smooth cream dessert', price: 70, category: 'desserts' },
  ]);

  const addDish = (dish: Dish) => setMenu(prev => [dish, ...prev]);
  const removeDish = (id: string) => setMenu(prev => prev.filter(item => item.id !== id));

  return (
    <MenuContext.Provider value={{ menu, addDish, removeDish }}>
      {children}
    </MenuContext.Provider>
  );
};
