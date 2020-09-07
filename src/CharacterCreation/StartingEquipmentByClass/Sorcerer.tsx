import React, { useState, useEffect } from 'react'
import { View, Button } from 'native-base'
import { JustUrl } from '../../common/models/models';
import ChoiceWrapper from './common/ChoiceWrapper';
import StyledButton from './common/StyledButton';
import Or from './common/Or';
import EqPicker from './common/EqPicker';
import getEquipmentList from './common/getEquipmentList';

export default function Sorcerer() {
  const [chosen1, setChosen1] = useState<string>('');
  const [chosen2, setChosen2] = useState<string>('');
  const [chosen3, setChosen3] = useState<string>('');
  const [foci, setFoci] = useState<Array<JustUrl>>([]);
  const [simpleWeapons, setSimpleWeapons] = useState<Array<JustUrl>>([]);
  const [chosenFocus, setChosenFocus] = useState<string>('choose');
  const [chosenSimple, setChosenSimple] = useState<string>('choose');


  const choice1 = {
    a: {
      "index": "crossbow-light",
      "name": "Crossbow and 20 bolts",
    },
    b: {
      "index": "simple-weapons",
      "name": "1 Simple Weapon",
    }
  };

  const choice2 = {
    a: {
      "index": "component-pouch",
      "name": "Component pouch",
    },
    b: {
      "index": "arcane-foci",
      "name": "Arcane Focus",
    }
  };

  const choice3 = {
    a: {
      "index": "dungeoneers-pack",
      "name": "Dungeoneer's Pack",
    },
    b: {
      "index": "explorers-pack",
      "name": "Explorer's Pack",
    }
  };

  useEffect(() => {
    getEquipmentList('arcane-foci')
    .then(data => setFoci(data))

    getEquipmentList('simple-weapons')
    .then(data => setSimpleWeapons(data))
  },[])

  return (
    <View>
      <ChoiceWrapper>
        <StyledButton title={choice1.a.name} bordered={chosen1 !== choice1.a.index} onButtonPress={() => setChosen1(choice1.a.index)} />
        <Or />
        <StyledButton title={choice1.b.name} bordered={chosen1 !== choice1.b.index} onButtonPress={() => setChosen1(choice1.b.index)} />
        {
          chosen1 === choice1.b.index &&
          <EqPicker data={simpleWeapons} selectedValue={chosenSimple} onChange={setChosenSimple} />
        }
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
    </View>
  )


}