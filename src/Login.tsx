import { createStyles, Title, Text, Container, Flex, Button } from '@mantine/core';
import { ReactComponent as ZeroDevLogo } from './resources/assets/images/logo.svg';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import Passkey from './Passkey';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 320px)': {
      fontSize: 28,
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },
}));

export function Login() {
  const { classes } = useStyles();

  return (
    <Container h={'100vh'}>
      <Flex justify={"center"} align="center" mih={'100%'} direction={'column'} gap={30}>
        <ZeroDevLogo width={200} height={'100%'} />
        <Title className={classes.title}>
          <Text component="span" className={classes.highlight} inherit>
          Proactive Taxing
          </Text>
        </Title>
        <ConnectButton label={"Login"} />
      </Flex>
    </Container>
  );
}