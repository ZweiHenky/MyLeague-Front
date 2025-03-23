import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLocalSearchParams } from 'expo-router';
import { Platform, Pressable, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Index from '.';
import { LinearGradient } from 'expo-linear-gradient';
import Resultados from './resultados';
import Horarios from './horarios';
import Clasificacion from './clasificacion';
import Brackets from './brackets';

function MyTabBar({ state, descriptors, navigation, position }:any) {
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: state.index * 85, animated: true });
    }
  }, [state.index]);

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
      <LinearGradient
          colors={['#2DAFE5','#12203F']}
          style={{position:'absolute',height:'110%', right:-350 , width:'300%'}}
          start={{x:0, y:0}}
          end={{x:1, y:0}}
          locations={[0,1]}
      >
      </LinearGradient>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        {state.routes.map((route:any, index:any) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 10,
                borderBottomWidth: isFocused ? 2 : 0,
                borderBottomColor: isFocused ? '#FBBC04' : 'transparent',
                width: 105,
              }}
            >
              <Text style={{ color: isFocused ? '#FBBC04' : 'white' }}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function Layout() {
  const {idLiga} = useLocalSearchParams();
  
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="index" component={Index} options={{title:"Detalle"}} />
      <Tab.Screen name="Resultados" component={Resultados} />
      <Tab.Screen name="Horarios" component={Horarios} />
      <Tab.Screen name="Clasificacion" component={Clasificacion} />
      <Tab.Screen name="Brackets" component={Brackets} />
    </Tab.Navigator>
  );
}