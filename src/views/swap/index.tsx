import { useState, useEffect, useRef, useCallback } from 'react';
import {
	Box, ToggleButton, ToggleButtonGroup, IconButton, Button, Typography,
	Popper, ClickAwayListener, Paper, Grow, MenuItem, MenuList, Stack
} from '@mui/material';
import SelectLP from "components/SelectLP";
import Pool from 'components/Pool';
import { styled } from '@mui/material/styles';
import { Settings } from '@mui/icons-material';
import { ArrowForwardIos, Dehaze } from '@mui/icons-material';
import SwapForm from 'components/Form';
import useResponsive from 'hooks/useResponsive';
import { useAppContext } from 'context/WalletContext';
import { getBalance, addLiquidity, TOKEN_TYPE, TOKEN_PAIR, getTokenBalance, getRateFromPair, formatDecimals, swapTokensToEth, getLpData, removeLiquidity, getPairData } from 'utils/integrate';
import { BigNumber } from 'ethers';
import SettingDialog from "components/SettingDialog"
import { web3Modal } from 'utils/web3Modal'
import { providers } from 'ethers'

const ToggleButtonStyle = styled(ToggleButton)(() => ({
	padding: '10px 20px',
	color: '#FFFFFF',
	borderRadius: '14px !important',
	backgroundColor: '#1F0F4A',
	border: 'none',
	textTransform: 'capitalize',
	'&.Mui-selected': {
		color: '#fff',
		backgroundColor: '#DD38F2 !important',
	},
	'& + &': {
		marginLeft: '10px !important',
	},
}));

const ButtonStyle = styled(Button)(() => ({
	borderRadius: '24px',
	marginTop: '16px',
	padding: '24px',
	color: '#FFFFFF',
	background: 'var(--btnColor)',
	fontSize: '20px',
	lineHeight: '27px',
	textTransform: 'capitalize',
}));

const ArrowStyleDown = styled('div')(() => ({
	position: 'relative',
	padding: 4,
	marginLeft: '80px',
	marginTop: -10,
	height: 30,
	width: 30,
	zIndex: 1,
	borderRadius: '8px',
	backgroundColor: '#1F0F4A',
	border: '3px solid #2B0E79',
	color: '#DD38F2',
	'& svg': {
		fontSize: 16,
		transform: 'rotate(90deg)',
	}
}));

const ArrowStyleTop = styled('div')(() => ({
	position: 'relative',
	padding: 4,
	marginLeft: '80px',
	marginTop: -10,
	height: 30,
	width: 30,
	zIndex: 1,
	borderRadius: '8px',
	backgroundColor: '#1F0F4A',
	border: '3px solid #2B0E79',
	color: '#DD38F2',
	'& svg': {
		fontSize: 16,
		transform: 'rotate(270deg)',
	}
}));

const options = ['swap', 'liquidity'];

enum OPTION_TYPE {
	SWAP = 'swap',
	LIQUIDITY = 'liquidity',
}

const Swap = () => {
	const [appState, setAppState] = useAppContext()

	const connect = useCallback(async function () {
		// This is the initial `provider` that is returned when
		// using web3Modal to connect. Can be MetaMask or WalletConnect.
		const provider = await web3Modal.connect()

		// We plug the initial `provider` into ethers.js and get back
		// a Web3Provider. This will add on methods from ethers.js and
		// event listeners such as `.on()` will be different.
		const web3Provider = new providers.Web3Provider(provider)

		const signer = web3Provider.getSigner()
		const address = await signer.getAddress()
		const network = await web3Provider.getNetwork()

		setAppState({...appState, provider: provider, web3Provider: web3Provider, address: address, chainId: network.chainId })
	}, [])

	useEffect(() => {
		if (web3Modal.cachedProvider) {
			connect()
		}
	}, [connect])

	// useEffect(() => {
	// 	if (appState.address !== '') {
	// 		setConnected(true);
	// 	} else {
	// 		setConnected(false)
	// 	}
	// }, [appState.address])

	const isMobile = useResponsive('down', 'sm')

	const [open, setOpen] = useState(false)
	const [waiting, setWaiting] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [optionValue, setOptionValue] = useState<OPTION_TYPE>(OPTION_TYPE.SWAP)
	// const [connected, setConnected] = useState(false)
	const [pairValue, setPairValue] = useState<string | null>('default')
	const [secondPairValue, setSecondPairValue] = useState<string | null>('default')
	const [amountTokenA, setAmountTokenA] = useState<string>('0.0')
	const [amountTokenB, setAmountTokenB] = useState<string>('0.0')
	const [balance, setBalance] = useState('0.0')
	const [balanceA, setBalanceA] = useState<number>(0.0)
	const [balanceB, setBalanceB] = useState<number>(0.0)
	const [rate, setRate] = useState<number>(0.0)
	const [lp, setLP] = useState<string | null>('default')
	const [lpRealBalance, setLpRealBalance] = useState<BigNumber>(BigNumber.from(0))
	const [lpBalance, setLpBalance] = useState<string>('0.0')
	const [lpTotalSupply, setLpTotalSupply] = useState<string>('0.0')
	const [lpPair, setLpPair] = useState<any>(null)
	const [reserveA, setReserveA] = useState<number>(0.0)
	const [reserveB, setReserveB] = useState<number>(0.0)
	const [pro, setPro] = useState<number>(0.0)
	const [pairs, setPairs] = useState<any[]>([])
	const [arrow, setArrow] = useState<boolean>(false)
	const [openSetting, setOpenSetting] = useState<boolean>(false)
	const [slippage, setSlippage] = useState<number>(0.1)
	const [deadline, setDeadline] = useState<number>(20)

	const handleOpenSetting = (state: boolean): void => {
		setOpenSetting(state)
	}

	const handleSlippage = (value: number): void => {
		setSlippage(value)
	}

	const handleDeadline = (value: number): void => {
		setDeadline(value)
	}

	function handleOptionClick(val: OPTION_TYPE) {
		setOptionValue(val);
	};

	const updateLP = (val: string | null) => {
		setLP(val);
	}

	useEffect(() => {
		setAmountTokenA('0.0')
		setAmountTokenB('0.0')
		setBalanceA(0.0)
		setBalanceB(0.0)
		setPairValue('default')
		setSecondPairValue('default')
	}, [optionValue])

	useEffect(() => {
		if (waiting) return;
		setAmountTokenA('0.0')
		setAmountTokenB('0.0')
		setBalanceA(0.0)
		setBalanceB(0.0)
		setPairValue('default')
		setSecondPairValue('default')
		if (appState.address !== '') {
			getPairs()
			getLiquidityData()
		}
	}, [waiting])

	async function getPairs() {
		setPairs(await getPairData())
	}

	async function getUserBalance() {
		setBalance(await getBalance())
	}
	getUserBalance()

	const updateAmountTokenA = (amount: string): void => {
		setAmountTokenA(amount);
		if (amount === '') {
			setAmountTokenB('0')
		} else if (rate > 0) {
			const value = (isNaN(parseFloat(amount)) ? 0 : parseFloat(amount)) / rate;
			setAmountTokenB(parseFloat(value.toFixed(6)).toString())
		}
	}

	const updateAmountTokenB = (amount: string): void => {
		setAmountTokenB(amount);
		if (amount === '') {
			setAmountTokenA('0');
		} else if (rate > 0) {
			const value = (isNaN(parseFloat(amount)) ? 0 : parseFloat(amount)) * rate;
			setAmountTokenA(parseFloat(value.toFixed(6)).toString())
		}
	}

	const updatePairValue = (pair: string | null): void => {
		setPairValue(pair);
		switch (pair) {
			case 'default': {
				setSecondPairValue('default')
				break;
			}
			case TOKEN_TYPE.BNB: {
				setSecondPairValue(TOKEN_TYPE.MILKY)
				break;
			}
			case TOKEN_TYPE.MILKY: {
				setSecondPairValue(TOKEN_TYPE.BNB);
				break;
			}
			case TOKEN_TYPE.BUSD: {
				setSecondPairValue(TOKEN_TYPE.BNB);
				break;
			}
			case TOKEN_TYPE.WSG: {
				setSecondPairValue(TOKEN_TYPE.BNB);
				break;
			}
			case TOKEN_TYPE.USDT: {
				setSecondPairValue(TOKEN_TYPE.BUSD);
				break;
			}
			default: {
				break;
			}
		}
	}

	const updateSecondPairValue = (pair: string | null): void => {
		setSecondPairValue(pair);
		switch (pair) {
			case 'default': {
				setPairValue('default')
				break;
			}
			case TOKEN_TYPE.MILKY: {
				setPairValue(TOKEN_TYPE.BNB);
				break;
			}
			case TOKEN_TYPE.BUSD: {
				setPairValue(TOKEN_TYPE.USDT);
				break;
			}
			case TOKEN_TYPE.WSG: {
				setPairValue(TOKEN_TYPE.MILKY);
				break;
			}
			case TOKEN_TYPE.BNB: {
				setPairValue(TOKEN_TYPE.MILKY);
				break;
			}
			case TOKEN_TYPE.USDT: {
				setPairValue(TOKEN_TYPE.BUSD);
				break;
			}
			default: {
				break;
			}
		}
	}

	const getOptionValue = (index: number) => {
		const option = options[index];
		if (option === OPTION_TYPE.SWAP) {
			return OPTION_TYPE.SWAP
		} else {
			return OPTION_TYPE.LIQUIDITY
		}
	}

	const handleLiquidity = async () => {
		if (appState.address !== '') {
			setWaiting(true);
			await addLiquidity(pairValue as TOKEN_TYPE, secondPairValue as TOKEN_TYPE, amountTokenA, amountTokenB, appState.address as string, deadline);
			setWaiting(false);
		}
	}

	const handleRemoveLiquidity = async () => {
		if (appState.address === '' || pro === 0) return;
		setWaiting(true);
		const pair: any = lp?.split('/');
		await removeLiquidity(pair[0], pair[1], lpRealBalance.div(BigNumber.from(pro.toString())), appState.address as string, deadline)
		setWaiting(false);
	}

	const handleSwap = async () => {
		if (appState.address !== '' && pairValue !== 'default' && pairValue !== 'default' ) {
			setWaiting(true)
			await swapTokensToEth(pairValue as TOKEN_TYPE, secondPairValue as TOKEN_TYPE, amountTokenA, amountTokenB, appState.address as string, slippage, deadline)
			setWaiting(false)
		}
	}

	const handleMenuItemClick = (
		index: number,
	) => {
		setSelectedIndex(index);
		setOptionValue(getOptionValue(index))
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: Event) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}
		setOpen(false);
	};

	async function handleFirstTokenBalance(token: TOKEN_TYPE) {
		if (appState.address !== '') {
			setBalanceA(await getTokenBalance(token, appState.address as string))
		}
	}

	async function handleSecondTokenBalance(token: TOKEN_TYPE) {
		if (appState.address !== '') {
			setBalanceB(await getTokenBalance(token, appState.address as string))
		}
	}

	async function handlePairRate(tokenA: TOKEN_TYPE, tokenB: TOKEN_TYPE) {
		setRate(await getRateFromPair(tokenA, tokenB))
	}

	async function handleLpBalance(tokenA: TOKEN_TYPE, tokenB: TOKEN_TYPE) {
		if (appState.address !== '') {
			const data = await getLpData(tokenA, tokenB, appState.address as string);
			setLpRealBalance(data.lpRealBalance)
			setLpBalance(data.lpBalance)
			setLpTotalSupply(data.lpTotalSupply)
			setReserveA(data.reserveA)
			setReserveB(data.reserveB)
		}
	}

	const getLpPairData = () => {
		TOKEN_PAIR.forEach((pair) => {
			if (pair.value === lp) {
				setLpPair(pair)
			}
		})
	}

	const updatePro = (value: number) => {
		setPro(value)
	}

	async function getLiquidityData() {
		if (lp === 'default') return;
		const pair: any = lp?.split('/');
		getLpPairData();
		handleLpBalance(pair[0] as TOKEN_TYPE, pair[1] as TOKEN_TYPE)
		handlePairRate(pair[0] as TOKEN_TYPE, pair[1] as TOKEN_TYPE)
	}

	useEffect(() => {
		if (pairValue === 'default' || appState.address == null) return;
		if (pairValue === TOKEN_TYPE.BNB){
			setBalanceA(formatDecimals(balance, 18))
		}
		else
			handleFirstTokenBalance(pairValue as TOKEN_TYPE)
	}, [pairValue])

	useEffect(() => {
		if (secondPairValue === 'default' || appState.address === '') return;
		if (secondPairValue === TOKEN_TYPE.BNB){
			setBalanceB(formatDecimals(balance, 18))
		}
		else
			handleSecondTokenBalance(secondPairValue as TOKEN_TYPE)
	}, [secondPairValue])

	useEffect(() => {
		handlePairRate(pairValue as TOKEN_TYPE, secondPairValue as TOKEN_TYPE);
	}, [pairValue, secondPairValue])

	useEffect(() => {
		getLiquidityData()
	}, [lp])

	// useEffect(() => {
	// 	if (appState.address !== '') {
	// 		getPairs()
	// 	}
	// }, [appState.address])

	return (
		<Box sx={{
			width: '100%',
			height: '700px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			p: 2,
		}}>
			<Box sx={{
				borderRadius: '30px',
				backgroundColor: '#2B0E79',
				width: 1,
				maxWidth: '670px',
				p: 1.5,
				pt: 4,
			}}>
				<div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
					{
						!isMobile ? (
							<ToggleButtonGroup
								value={optionValue}
								exclusive
								aria-label="text alignment"
							>
								<ToggleButtonStyle value="swap" aria-label="left aligned" onClick={() => { handleOptionClick(OPTION_TYPE.SWAP); handleMenuItemClick(0) }}>
									Swap
								</ToggleButtonStyle>
								<ToggleButtonStyle value="liquidity" aria-label="right aligned" onClick={() => { handleOptionClick(OPTION_TYPE.LIQUIDITY); handleMenuItemClick(2) }}>
									Liquidity
								</ToggleButtonStyle>
							</ToggleButtonGroup>
						) : (
							<Button
								size="small"
								aria-controls={open ? 'split-button-menu' : undefined}
								aria-expanded={open ? 'true' : undefined}
								aria-label="select merge strategy"
								aria-haspopup="menu"
								onClick={handleToggle}
								ref={anchorRef}
							>
								<Dehaze />
							</Button>
						)
					}
					<IconButton sx={{ color: 'white' }} onClick={() => setOpenSetting(true)}>
						<Settings sx={{ fontSize: '36px' }} />
					</IconButton>
				</div>
				<div style={{ padding: '10px' }}>
					{
						optionValue === OPTION_TYPE.SWAP ? (
							<>
								<Stack direction='column'>
									<Stack direction={arrow ? 'column-reverse' : 'column'}>
										<SwapForm label={arrow ? "Swap to" : "Swap from"} pairValue={pairValue} balance={balanceA} amount={amountTokenA} updatePairValue={updatePairValue} updateAmount={updateAmountTokenA} />
										<ArrowStyleDown onClick={() => setArrow(!arrow)}><ArrowForwardIos /></ArrowStyleDown>
										<SwapForm label={arrow ? "Swap from" : "Swap to"} pairValue={secondPairValue} balance={balanceB} amount={amountTokenB} updatePairValue={updateSecondPairValue} updateAmount={updateAmountTokenB} />
									</Stack>
									<Stack direction='row' alignItems='center' paddingX={3} paddingTop={1} sx={{color: 'white'}}>
										<Typography sx={{paddingRight: '16px'}}>Slippage Tolerance</Typography>
										<Typography>{ slippage }%</Typography>
									</Stack>
								</Stack>
								{
									appState.web3Provider ? (
										<ButtonStyle fullWidth onClick={handleSwap} disabled={waiting ? true : false}>Swap</ButtonStyle>
									) : (
										<ButtonStyle fullWidth onClick={connect}>Connect Wallet</ButtonStyle>
									)
								}
							</>
						) : (
							<>
								<SelectLP lp={lp} pairs={pairs} updateLP={updateLP} connected={appState.web3Provider ? true : false}></SelectLP>
								{
									lp !== 'default' ? (
										<>
											<Pool lpPair={lpPair} lpBalance={lpBalance} lpTotalSupply={lpTotalSupply} reserveA={reserveA} reserveB={reserveB} rate={rate} updatePro={updatePro} />
											{
												appState.web3Provider ? (
													<ButtonStyle fullWidth onClick={handleRemoveLiquidity} disabled={waiting ? true : false}>Remove Liquidity</ButtonStyle>
												) : (
													<ButtonStyle fullWidth onClick={connect}>Connect Wallet</ButtonStyle>
												)
											}
										</>
									) : (
										<>
											<SwapForm label="Liquidity" pairValue={pairValue} balance={balanceA} amount={amountTokenA} updatePairValue={updatePairValue} updateAmount={updateAmountTokenA} />
											{
												arrow ? (
													<ArrowStyleTop sx={{ visibility: 'hidden' }} onClick={() => setArrow(false)}><ArrowForwardIos /></ArrowStyleTop>
												) : (
													<ArrowStyleDown sx={{ visibility: 'hidden' }} onClick={() => setArrow(true)}><ArrowForwardIos /></ArrowStyleDown>
												)
											}
											<SwapForm label="Liquidity" pairValue={secondPairValue} balance={balanceB} amount={amountTokenB} updatePairValue={updateSecondPairValue} updateAmount={updateAmountTokenB} />
											{
												appState.web3Provider ? (
													<ButtonStyle fullWidth onClick={handleLiquidity} disabled={waiting ? true : false}>Add Liquidity</ButtonStyle>
												) : (
													<ButtonStyle fullWidth onClick={connect}>Connect Wallet</ButtonStyle>
												)
											}
										</>
									)
								}
							</>
						)
					}
				</div>
			</Box>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				style={{ zIndex: 2 }}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom' ? 'center top' : 'center bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id="split-button-menu">
									{options.map((option, index) => (
										<MenuItem
											key={option}
											selected={index === selectedIndex}
											onClick={() => handleMenuItemClick(index)}
										>
											{option}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			{
				openSetting && (
					<SettingDialog open={true} slippage={slippage} deadline={deadline} handleOpen={handleOpenSetting} handleSlippage={handleSlippage} handleDeadline={handleDeadline}></SettingDialog>
				)
			}
		</Box>
	);
};

export default Swap;