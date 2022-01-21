import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/logo_trans.png'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background: #161414 url(${logo}) no-repeat;
  background-position: bottom right;
  border-radius: 15px;
  color: #FFFFFF !important;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default Card;
