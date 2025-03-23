import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenOne from '@/app/(tabs)/home/[idLiga]/resultados';
import ScreenTwo from '@/app/(tabs)/home/[idLiga]/horarios';
import Index from '@/app/(tabs)/leagues';


const Tab = createMaterialTopTabNavigator();

export default function TabHeaderDetailLeague() {
  return (

      <Tab.Navigator>
        <Tab.Screen name="screenOne" component={ScreenOne} />
        <Tab.Screen name="index" component={Index} />
        <Tab.Screen name="screenTwo" component={ScreenTwo} />
      </Tab.Navigator>

  );
}