import { Link, Box, Typography, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import useResponsive from 'hooks/useResponsive';
import medium from 'assets/images/medium.png';
import twitter from 'assets/images/twitter.png';
import telegram from 'assets/images/telegram.png';

const IconButtonStyle = styled(IconButton)(() => ({
	color: '#FFFFFF',
	backgroundColor: '#6A1787',
	width: '33px',
	height: '33px',
}));

const LinkStyle = styled(Link)(() => ({
	color: 'white',
	textDecoration: 'none',
	fontSize: 11,
}));

const Footer = () => {
	const smDown = useResponsive('down', 'sm');

	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			flexDirection: smDown ? 'column' : 'row',
			gap: '15px',
			py: '22px',
			mx: 3,
			borderTop: '1px solid #FFFFFF',
		}}>
			<LinkStyle>Analystics</LinkStyle>
			<LinkStyle>wsG Gaming</LinkStyle>
			<Stack direction="row" spacing={2.5} mx={5}>
				<IconButtonStyle>
					<img src={twitter} alt="Twitter" />
				</IconButtonStyle>
				<IconButtonStyle>
					<img src={telegram} alt="Telegram" />
				</IconButtonStyle>
				<IconButtonStyle>
					<img src={medium} alt="Medium" />
				</IconButtonStyle>
				{/* <Iconify icon={'eva:copy-fill'} sx={{width: 24, height:24}} /> */}
			</Stack>
			<LinkStyle>Discord</LinkStyle>
			<Typography variant="body2" color="white" fontSize={11}>Built: 1.0.2.3.4.</Typography>
		</Box>
	)
};

export default Footer;