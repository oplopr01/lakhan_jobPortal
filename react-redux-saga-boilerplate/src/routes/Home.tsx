import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Box, Button, Container, Icon, responsive, Text } from '@gilbarbara/components';

import { name } from '~/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from '~/modules/theme';

import { logOutSuccess, login, loginSuccess } from '~/actions';
import { STATUS } from '~/literals';

import Background from '~/components/Background';
import Logo from '~/components/Logo';

import { RootState } from '~/types';
import HomeHeader from '~/components/HomeHeader';
import HomeContainer from '~/components/HomeContainer';
import Header from '~/components/Header';
import { useAppSelector } from '~/modules/hooks';
import { selectUser } from '~/selectors';
import bgImg from "../assets/Images/bgimg.jpg"
import Footer from '~/components/Footer';

// const Header = styled.div`
//   margin-bottom: ${theme.spacing.lg};
//   text-align: center;

//   svg {
//     height: 100px;
//     width: auto;

//     ${responsive({
//       lg: {
//         height: '180px',
//       },
//     })};
//   }
// `;

const Heading = styled.h1`
  color: #fff;
  font-size: 35px;
  line-height: 1.4;
  margin-bottom: ${theme.spacing.lg};
  margin-top: 0;
  text-align: center;

  ${responsive({
    lg: {
      fontSize: '40px',
    },
  })};
`;

function Home() {
  const {isAuthenticated}= useAppSelector(selectUser)
  // const dispatch = useDispatch();
  const status = useSelector<RootState>(({ user }) => user.status);

  return (
    <div className="container-fluid" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      {/* <Header/> */}
      <HomeContainer login={isAuthenticated} />
      <Footer/>
    </div>
  );
}

export default Home;
