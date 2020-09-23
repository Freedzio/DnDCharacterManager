import { Col, Row } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import Tile from '../../CharacterCreation/Tile'
import { StoreProps } from '../../redux/store'

export default function MoneyDisplayer() {
  const money = useSelector((store: StoreProps) => store.money)

  return (
    <Row>
      <Col>
        <Tile property='CP' amount={money['cp']} />
      </Col>
      <Col>
        <Tile property='SP' amount={money['sp']} />
      </Col>
      <Col>
        <Tile property='EP' amount={money['ep']} />
      </Col>
      <Col>
        <Tile property='GP' amount={money['gp']} />
      </Col>
      <Col>
        <Tile property='PP' amount={money['pp']} />
      </Col>
    </Row>
  )
}