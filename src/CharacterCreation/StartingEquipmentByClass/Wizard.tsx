import React, { useState, useEffect } from 'react'
import { View } from 'native-base'
import { JustUrl, EqItem, FinalItem } from '../../common/models/models';
import getEquipmentList from './common/getEquipmentList';
import ChoiceWrapper from './common/ChoiceWrapper';
import StyledButton from './common/StyledButton';
import Or from './common/Or';
import EqPicker from './common/EqPicker';
import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/items';
import apiWrapper from '../../common/functions/apiWrapper';
import { ApiConfig } from '../../common/constants/ApiConfig';
import GoNextButton from './common/GoNextButton';

export default function Wizard({ onNextPress, navigation }: any) {
  const items: FinalItem[] = require('../../database/Equipment.json');

  const [chosen1, setChosen1] = useState<string>('');
  const [chosen2, setChosen2] = useState<string>('');
  const [chosen3, setChosen3] = useState<string>('');
  const [foci, setFoci] = useState<Array<JustUrl>>([])
  const [chosenFocus, setChosenFocus] = useState<string>('choose')

  const dispatch = useDispatch();
  const dispatchItems = (items: Array<FinalItem>) => dispatch(addItems(items));

  const choice1 = {
    a: {
      index: "dagger",
      name: "Dagger",
    },
    b: {
      index: "quarterstaff",
      name: "Quarterstaff",
    }
  };

  const choice2 = {
    a: {
      index: "component-pouch",
      name: "Component pouch",
    },
    b: {
      index: "arcane-foci",
      name: "Arcane Focus",
    }
  };

  const choice3 = {
    a: {
      index: "scholars-pack",
      name: "Scholar's Pack",
    },
    b: {
      index: "dungeoneers-pack",
      name: "Dungeoneer's Pack",
    }
  }

  useEffect(() => {
    setFoci(items.filter(item => item.gear_category).filter(item => item.gear_category.index === 'arcane-foci'))
  }, []);

  function getItem(item: string) {
    if (item !== '' && item !== 'choose') dispatchItems(items.filter(eq => eq.index === item))
  }

  function getChosenData() {
    getItem(chosen1)
    if (chosen2 === 'arcane-foci') getItem(chosenFocus)
    else getItem(chosen2)

    getItem(chosen3)
  }

  function goNext() {
    onNextPress();
    getChosenData();
  }

  return (
    <View>
      <ChoiceWrapper>
        <StyledButton title={choice1.a.name} bordered={chosen1 !== choice1.a.index} onButtonPress={() => setChosen1(choice1.a.index)} />
        <Or />
        <StyledButton title={choice1.b.name} bordered={chosen1 !== choice1.b.index} onButtonPress={() => setChosen1(choice1.b.index)} />
      </ChoiceWrapper>
      <ChoiceWrapper>
        <StyledButton title={choice2.a.name} bordered={chosen2 !== choice2.a.index} onButtonPress={() => setChosen2(choice2.a.index)} />
        <Or />
        <StyledButton title={choice2.b.name} bordered={chosen2 !== choice2.b.index} onButtonPress={() => setChosen2(choice2.b.index)} />
        {
          chosen2 === choice2.b.index &&
          <EqPicker data={foci} selectedValue={chosenFocus} onChange={setChosenFocus} />
        }
      </ChoiceWrapper>
      <ChoiceWrapper>
        <StyledButton title={choice3.a.name} bordered={chosen3 !== choice3.a.index} onButtonPress={() => setChosen3(choice3.a.index)} />
        <Or />
        <StyledButton title={choice3.b.name} bordered={chosen3 !== choice3.b.index} onButtonPress={() => setChosen3(choice3.b.index)} />
      </ChoiceWrapper>
      <GoNextButton goNext={goNext} navigation={navigation} />
    </View>
  )
}