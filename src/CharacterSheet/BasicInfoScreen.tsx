import { Card, CheckBox, Col, Container, Content, List, ListItem, Row, Text, View } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import Tile from '../CharacterCreation/Tile'
import ScreenHeader from '../common/components/ScreenHeader'
import getAbilityModifier from '../common/functions/getAbilityModifier'
import { spellStyle } from '../common/styles/styles'
import store, { StoreProps } from '../redux/store'

export default function BasicInfoScreen() {
  const [success1, setSuccess1] = useState<boolean>(false);
  const [success2, setSuccess2] = useState<boolean>(false);
  const [success3, setSuccess3] = useState<boolean>(false);
  const [fail1, setFail1] = useState<boolean>(false);
  const [fail2, setFail2] = useState<boolean>(false);
  const [fail3, setFail3] = useState<boolean>(false);
  const [chosenTrait, setChosenTrait] = useState<string>('');

  const abilityScores = useSelector((store: StoreProps) => store.abilityScores);
  const basicInfo = useSelector((store: StoreProps) => store.basicInfo);
  const name = useSelector((store: StoreProps) => store.name);
  const maxHP = useSelector((store: StoreProps) => store.maxHP);
  const equipped = useSelector((store: StoreProps) => store.equipped);
  const features = useSelector((store: StoreProps) => store.features);
  const items = useSelector((store: StoreProps) => store.items);
  const traits = useSelector((store: StoreProps) => store.traits);

  function calculateArmorClass() {
    if (Object.keys(features).includes('monk-unarmored-defense') && !equipped.some(item => items[item].equipment_category.index === 'armor')) return 10 + getAbilityModifier(abilityScores['DEX'].score) + getAbilityModifier(abilityScores['WIS'].score);
    if (Object.keys(features).includes('barbarian-unarmored-defense') && !equipped.some(item => items[item].equipment_category.index === 'armor' && items[item].index !== 'shield')) return 10 + getAbilityModifier(abilityScores['DEX'].score) + getAbilityModifier(abilityScores['CON'].score);

    const equippedArmor = equipped.filter(item => items[item].equipment_category.index === 'armor' && items[item].index !== 'shield');

    if (equippedArmor.length === 0) return 10 + getAbilityModifier(abilityScores['DEX'].score) + (equipped.filter(item => items[item].index === 'shield').length > 0 ? 2 : 0)

    let ac = 0;

    if (equipped.some(item => items[item].index === 'shield')) ac += 2;
    if (Object.keys(features).some(feat => feat.includes('fighting-style-defense'))) ac += 1;
    if (features)

      for (let i = 0; i < equippedArmor.length; i++) {
        if (Object.keys(features).includes('fighting-style-defense')) ac++;

        const item = equippedArmor[i];

        ac += items[item].armor_class.base;

        const mod = getAbilityModifier(abilityScores['DEX'].score);

        if (items[item].armor_class.dex_bonus && mod > 0) {
          const maxBonus = items[item].armor_class.max_bonus
          if (maxBonus === null) ac += mod
          else ac += (mod > maxBonus ? maxBonus : mod);
        }
      }

    return ac
  }

  function onTraitPress(trait: string) {
    if (chosenTrait === trait) setChosenTrait('')
    else setChosenTrait(trait)
  }

  return (
    <Container>
      <Content>
        <ScreenHeader title="BASIC INFO" subtitle={name} />
        <Row>
          <Col>
            <Tile property='Armor class' amount={calculateArmorClass()} />
          </Col>
          <Col>
            <Tile property='Initiative' amount={getAbilityModifier(abilityScores['DEX'].score)} />
          </Col>
          <Col>
            <Tile property="Speed" amount={basicInfo.speed} />
          </Col>
          <Col>
            <Tile property="Passive perception" amount={10 + getAbilityModifier(abilityScores['WIS'].score)} />
          </Col>
        </Row>
        <Card>
          <Text style={styles.sectionTitle}>HP</Text>
          <Row>
            <Col>
              <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Current</Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>{maxHP}</Text>
            </Col>
            <Col>
              <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Max</Text>
              <Text style={{ textAlign: "center", fontSize: 20 }}>{maxHP}</Text>
            </Col>
          </Row>
        </Card>
        <Card>
          <Text style={styles.sectionTitle}>Death rolls</Text>
          <View style={{ padding: 30, paddingTop: 0 }}>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ flex: 1 }}>
                <Text>Success</Text>
              </View>
              <View style={{ flex: 4, flexDirection: 'row' }}>
                <CheckBox style={{ marginHorizontal: 20, width: 30, height: 30 }} onPress={() => setSuccess1(!success1)} checked={success1} />
                <CheckBox style={{ marginHorizontal: 20, width: 30, height: 30 }} onPress={() => setSuccess2(!success2)} checked={success2} />
                <CheckBox style={{ marginHorizontal: 20, width: 30, height: 30 }} onPress={() => setSuccess3(!success3)} checked={success3} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ flex: 1 }}>
                <Text>Failure</Text>
              </View>
              <View style={{ flex: 4, flexDirection: 'row' }}>
                <CheckBox style={{ marginHorizontal: 20, width: 30, height: 30 }} onPress={() => setFail1(!fail1)} checked={fail1} />
                <CheckBox style={{ marginHorizontal: 20, width: 30, height: 30 }} onPress={() => setFail2(!fail2)} checked={fail2} />
                <CheckBox style={{ marginHorizontal: 20, width: 30, height: 30 }} onPress={() => setFail3(!fail3)} checked={fail3} />
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <Text style={styles.sectionTitle}>Features and traits</Text>
          <List>
            {
              Object.keys(traits).map((trait: string, index: number) =>
                <TouchableOpacity onPress={() => onTraitPress(trait)} key={index}>
                  <ListItem>
                    <Text style={[spellStyle.spellMain, { textAlign: 'left' }]}>{traits[trait].name} </Text>
                  </ListItem>
                  {
                    chosenTrait === trait &&
                    <View>
                      {
                        traits[trait].desc.map((desc: string, index: number) =>
                          <Text style={spellStyle.desc} key={index}>{desc}</Text>
                        )
                      }
                    </View>
                  }
                </TouchableOpacity>
              )
            }
            {
              Object.keys(features).map((feat: string, index: number) => 
              <TouchableOpacity onPress={() => onTraitPress(feat)} key={index}>
                  <ListItem>
                    <Text style={[spellStyle.spellMain, { textAlign: 'left' }]}>{features[feat].name} </Text>
                  </ListItem>
                  {
                    chosenTrait === feat &&
                    <View>
                      {
                       features[feat].desc && features[feat].desc.map((desc: string, index: number) =>
                          <Text style={spellStyle.desc}>{desc} </Text>
                        )
                      }
                    </View>
                  }
                </TouchableOpacity>
              )
            }
          </List>
        </Card>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10
  }
})