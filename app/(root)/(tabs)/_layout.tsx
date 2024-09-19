import { icons } from '@/constants';
import tw from '@/lib/tailwind';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon({ source, focused }: { source: ImageSourcePropType; focused: boolean }) {
  return (
    <View style={tw.style(`w-12 h-12 flex-center rounded-full`, focused && `bg-general-400`)}>
      <Image
        source={source}
        resizeMode='contain'
        tintColor='white'
        style={tw`w-7 h-7`}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#004d7a',
          borderRadius: 50,
          paddingBottom: 0,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          overflow: "hidden",
          position: "absolute",
          borderTopWidth: 0,
        }
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon source={icons.home} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ focused }) => <TabBarIcon source={icons.ticket} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: 'Rides',
          tabBarIcon: ({ focused }) => <TabBarIcon source={icons.list} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon source={icons.profile} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
