import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { BASIC_INFO_SCREEN, SKILLS_SCREEN } from '../common/constants/routeNames'
import BasicInfoScreen from './BasicInfoScreen'
import SkillsScreen from './SkillsScreen'

export default function SheetNavigator() {

  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator initialRouteName={BASIC_INFO_SCREEN}>
      <Tab.Screen name={BASIC_INFO_SCREEN} component={BasicInfoScreen} />
      <Tab.Screen name={SKILLS_SCREEN} component={SkillsScreen} />
    </Tab.Navigator>
  )
}