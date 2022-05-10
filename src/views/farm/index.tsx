import {
	Box, Container, Stack, Divider, TextField, InputAdornment,
	Typography, Table, TableBody, TableCell, TableContainer,
	TableRow, TableHead, Collapse, Button, Grid, CircularProgress
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Search, Help } from '@mui/icons-material'
import { fCurrency, fPercent } from 'utils/numbers'
import useResponsive from 'hooks/useResponsive'
import React, { useState, useEffect, useCallback } from "react"
import { web3Modal } from 'utils/web3Modal'
import { providers } from 'ethers'

import {
	TOKEN_DATA,
	getPoolDataFromPoint,
	getPoolDataFromAddress,
	getPairDataFromLpAddr,
	TOKEN_TYPE,
	getPendingMilky,
	unstakeTokensFromPool,
	getCurrentPoolTVL,
	getRewardsPerDay,
	getCurrentPoolAPR
} from 'utils/integrate'

import CustomizedDialogs from 'components/StakeDialog'
import { TypeDialog } from 'config/constants/types'
import { BlockNetworkId } from "config/constants/common"
import { useAppContext } from 'context/WalletContext'

const InputStyle = styled(TextField)(() => ({
	padding: '0px 20px',
	borderRadius: '14px',
	backgroundColor: '#2b0e79',
	width: '100%',
	color: '#FFFFFF',
	'& fieldset': {
		display: 'none',
	},
	'& input, & svg': {
		color: '#FFFFFF',
	},
	'&::after, &::before': {
		display: 'none',
	},
	'.MuiInputBase-root': {
		paddingRight: '0',
		fontFamily: 'DM sans',
	}
}));

const CustomTypography = styled(Typography)(() => ({
	fontFamily: 'DM sans'
}))

const TableStyle = styled(Table)(() => ({
	borderCollapse: 'separate',
	borderSpacing: '0px 8px',
	'tr': {
		'td, th': {
			color: '#FFFFFF',
			fontFamily: 'DM sans',
			borderBottom: 'none'
		},
		'th:first-of-type': {
			paddingLeft: 20,
		}
	},
	'thead': {
		'& tr th': {
			fontWeight: '700',
			fontFamily: 'DM sans',
			padding: '3px 16px',
		}
	},
	'tbody': {
		'& tr td': {
			fontFamily: 'DM sans'
		}
	}
	// 'tbody': {
	// 	'tr': {
	// 		margin: '5px 0',
	// 		'&:nth-of-type(odd)': {
	// 			backgroundColor: '#2b0e79',
	// 		},
	// 		'&:nth-of-type(even)': {
	// 			backgroundColor: '#1f0f4a',
	// 		},
	// 		'th': {
	// 			borderRadius: '14px 0 0 14px',
	// 		},
	// 		'td:last-of-type': {
	// 			borderRadius: '0 14px 14px 0',
	// 		}
	// 	}
	// }
}));

const CustomFarmBox = styled(Box)(() => ({
	borderRadius: '14px',
	background: '#2b0e79',
	cursor: 'pointer',
	'&:hover': {
		background: '#1f0f4a'
	},
	color: '#FFFFFF',
	padding: '30px 40px'
}))

interface FarmBoxProps {
	text: string,
	type: boolean,
	point: number,
	farmClicked: (arg: number) => void
};


const FarmBox = ({ text, type, point, farmClicked }: FarmBoxProps) => {
	const backgroundColor = type === false ? '#2b0e79' : '#DD38F2';
	const [loading, setLoading] = useState(false)
	const points = [2000, 1000, 500, 100];
	const click = () => {
		farmClicked(point);
	}

	return (
		<CustomFarmBox sx={{ backgroundColor }} onClick={() => click()}>
			<Stack direction='row' alignItems='center' justifyContent='space-between'>
				<CustomTypography>{text}</CustomTypography>
				<a href='/swap' style={{ color: '#1a73e8', textDecoration: 'underline' }}>Add Liquidity</a>
			</Stack>
		</CustomFarmBox>
	);
};

interface poolInterface {
	lpAddr: string,
	tokenA: string,
	tokenB: string,
	allocPoint: number,
	pid: number
}

const Farm = () => {
	const isDesktop = useResponsive('up', 'md');
	const [poolData, setPoolData] = useState<any>([])
	const [point, setPoint] = useState<number>(2000);
	const [loading, setLoading] = useState(false)
	const [searchPattern, setSearchPattern] = useState('')

	const getPoolsData = async () => {
		setLoading(true);
		setPoolData(await getPoolDataFromPoint(point))
		setLoading(false);
	}

	const getSearchData = async () => {
		setLoading(true)
		setPoolData(await getPoolDataFromAddress(searchPattern))
		setLoading(false)
	}

	useEffect(() => {
		console.log('point', point)
		getPoolsData()
	}, [point])

	useEffect(() => {
		getSearchData()
	}, [searchPattern])

	const farmClicked = async (point: number) => {
		setPoint(point)
	}

	return (
		<Container>
			<Stack direction={isDesktop ? "row" : "column"} spacing={5} mt={5}>
				<Stack
					spacing={2}
					sx={{
						width: isDesktop ? '300px' : '100%',
					}}
				>
					<FarmBox text="Your Farm" type={false} point={-1} farmClicked={farmClicked} />
					<Divider sx={{ my: 1, bgcolor: "#dd38f2 !important" }} />
					<Stack spacing={1.5}>
						{
							[2000, 1000, 500, 100].map((pt, index) => (
								point === pt ?
									<FarmBox key={index} text={`Core${index + 1}`} type={true} point={pt} farmClicked={farmClicked} />
									:
									<FarmBox key={index} text={`Core${index + 1}`} type={false} point={pt} farmClicked={farmClicked} />
							))
						}
					</Stack>
				</Stack>
				<Box sx={{ flexGrow: 1 }}>
					<InputStyle
						placeholder="Search by name, symbol, address"
						value={searchPattern}
						onChange={(e) => setSearchPattern(e.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							),
						}}
					/>
					<Stack direction="row" my={4} spacing={1} alignItems="center" overflow='hidden'>
						<CustomTypography variant="body2" sx={{ color: '#FFFFFF' }}>Farms</CustomTypography>
						<Divider sx={{ width: '100%', my: 1, bgcolor: "#dd38f2 !important" }} />
					</Stack>

					{
						loading ? (
							<Stack direction="column" alignItems='center' justifyContent='center' marginTop={4} marginBottom={4}>
								<CircularProgress></CircularProgress>
							</Stack>
						) : (
							<TableContainer>
								<TableStyle sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Pool</TableCell>
											<TableCell>TVL</TableCell>
											<TableCell>Rewards</TableCell>
											<TableCell align="right">APR</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											poolData.map((pool: any, index: number) => (
												<Row key={index} index={index} pool={pool}></Row>
											))
										}
									</TableBody>
								</TableStyle>
							</TableContainer>
						)
					}
				</Box>
			</Stack>
		</Container>
	);
};

interface RowProps {
	pool: any,
	index: number
}

function Row({ pool, index }: RowProps) {
	const [appState, setAppState] = useAppContext()
	const [open, setOpen] = React.useState(false)
	const [openStakeDlg, setOpenStakeDlg] = useState(false)
	const [openUnStakeDlg, setOpenUnStakeDlg] = useState(false)
	const [pendingMilky, setPendingMilky] = useState(0.0)
	const [tvl, setTVL] = useState(0.0)
	const [apr, setAPR] = useState(0.0)
	const [rewards, setRewards] = useState(0.0)
	const [loading, setLoading] = useState(false)

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

		setAppState({ ...appState, provider: provider, web3Provider: web3Provider, address: address, chainId: network.chainId })
	}, [])

	useEffect(() => {
		if (web3Modal.cachedProvider) {
			connect()
		}
	}, [connect])

	async function handleClickStake() {
		if (appState.address !== '' && pool.tokenA && pool.tokenB) {
			setOpenStakeDlg(true);
		}
	}

	async function handleGetRewards() {
		setTVL(await getCurrentPoolTVL(pool.pid))
		setRewards(await getRewardsPerDay(pool.pid))
	}

	async function handleGetApr() {
		setAPR(await getCurrentPoolAPR(tvl, rewards))
	}

	async function handleClickUnstake() {
		if (appState.address !== '' && pool.tokenA && pool.tokenB) {
			setOpenUnStakeDlg(true);
		}
	}

	async function handlePendingMilky(pid: number, lpAddr: string) {
		setPendingMilky(await getPendingMilky(pid, lpAddr))
	}

	async function handleHarvest() {
		setLoading(true)
		await unstakeTokensFromPool(index, pool.address, '0');
		setPendingMilky(0.0)
		setLoading(false)
	}

	useEffect(() => {
		if (appState.address !== '') {
			handlePendingMilky(pool.pid, pool.address)
		}
	}, [appState.address])

	async function handleGetPoolData(lpAddr: string) {
		// setDataFetching(true)
		setTVL(await getCurrentPoolTVL(pool.pid))
		setRewards(await getRewardsPerDay(pool.pid))
		setAPR(await getCurrentPoolAPR(tvl, rewards))
		// setDataFetching(false)
	}

	useEffect(() => {
		if (pool.address) {
			handleGetPoolData(pool.address)
		}
	})

	const handleStakeOpen = (state: boolean): void => {
		setOpenStakeDlg(state)
	}

	const handleUnstakeOpen = (state: boolean): void => {
		setOpenUnStakeDlg(state)
	}

	return (
		<React.Fragment>
			<TableRow
				key={index}
				onClick={() => setOpen(!open)}
				sx={{
					backgroundColor: '#2b0e79',
					'&:hover': {
						backgroundColor: '#1f0f4a'
					},
					height: '100px'
				}}
			>
				<TableCell component="th" scope="row" sx={{ borderTopLeftRadius: '14px', borderBottomLeftRadius: '14px' }}>

					<Stack direction="row" alignItems='center' spacing={3}>
						<Box>
							{
								pool.address === TOKEN_DATA[TOKEN_TYPE.MILKY].address ? (
									<img
										loading="lazy"
										width="30"
										src={TOKEN_DATA[TOKEN_TYPE.MILKY].image}
										alt={`Flag of ${TOKEN_DATA[TOKEN_TYPE.MILKY].label}`}
										style={{ display: 'inline-flex', paddingRight: '4px' }}
									/>
								) : pool.tokenA && pool.tokenB && (
									<>
										<img
											loading="lazy"
											width="30"
											src={TOKEN_DATA[pool.tokenA as TOKEN_TYPE].image}
											alt={`Flag of ${TOKEN_DATA[pool.tokenA as TOKEN_TYPE].label}`}
											style={{ display: 'inline-flex', paddingRight: '4px' }}
										/>
										<img
											loading="lazy"
											width="30"
											src={TOKEN_DATA[pool.tokenB as TOKEN_TYPE].image}
											alt={`Flag of ${TOKEN_DATA[pool.tokenA as TOKEN_TYPE].label}`}
											style={{ display: 'inline-flex', paddingRight: '4px' }}
										/>
									</>
								)
							}
						</Box>
						<Stack>
							{
								pool.address === TOKEN_DATA[TOKEN_TYPE.MILKY].address ? (
									<CustomTypography fontSize={16} fontWeight="700">Milky</CustomTypography>
								) : pool.tokenA && pool.tokenB && (
									<CustomTypography fontSize={16} fontWeight="700">{TOKEN_DATA[pool.tokenA as TOKEN_TYPE].label}/{TOKEN_DATA[pool.tokenB as TOKEN_TYPE].label}</CustomTypography>
								)
							}
							<CustomTypography variant="body2" color="secondary" fontSize={12}>MilkySwap</CustomTypography>
							<CustomTypography variant="body2" color="secondary" fontSize={12}>Farm</CustomTypography>
						</Stack>
					</Stack>
				</TableCell>
				<TableCell>{fCurrency(tvl)}</TableCell>
				<TableCell>
					<Stack direction="row" alignItems="center" spacing={2}>
						<Box>
							<img
								loading="lazy"
								width="30"
								src={TOKEN_DATA[TOKEN_TYPE.MILKY].image}
								alt={`Flag of ${TOKEN_DATA[TOKEN_TYPE.MILKY].label}`}
								style={{ display: 'inline-flex', paddingRight: '4px' }}
							/>
						</Box>
						<CustomTypography fontSize={12}>
							{rewards.toFixed(1)} TOKEN / DAY
						</CustomTypography>
					</Stack>
				</TableCell>
				<TableCell align="right" sx={{ borderTopRightRadius: '14px', borderBottomRightRadius: '14px' }}>
					<Stack direction="row" spacing={1} justifyContent="flex-end">
						<CustomTypography fontSize={14}>
							{fPercent(apr)}
						</CustomTypography>
						<Help />
					</Stack>
					<CustomTypography fontSize={14} sx={{ opacity: 0.3 }}>
						annualized
					</CustomTypography>
				</TableCell>
			</TableRow>
			<TableRow sx={{
				backgroundColor: '#2b0e79'
			}}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0, borderRadius: '14px' }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Grid container justifyContent="space-between" paddingTop={2} paddingBottom={2}>
							<Grid item borderRadius={3} padding={2} border={2} borderColor={'#fff'} xs={5}>
								<Box>
									<CustomTypography sx={{ color: '#fff' }}>
										MILKY EARNED
									</CustomTypography>
								</Box>
								<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
									<CustomTypography sx={{ color: '#fff' }}>
										{pendingMilky}
									</CustomTypography>
									<Button disabled={(pendingMilky > 0 && !loading) ? false : true} variant="contained" onClick={handleHarvest}>Harvest</Button>
								</Box>
							</Grid>
							<Grid item borderRadius={3} padding={2} border={2} borderColor={'#fff'} xs={5}>
								<Stack direction="row" alignItems="center">
									<CustomTypography sx={{ color: '#fff' }}>
										Stake / Unstake
									</CustomTypography>
									<CustomTypography paddingLeft={3}>
										{
											pool.tokenA && pool.tokenB && (
												`${TOKEN_DATA[pool.tokenA as TOKEN_TYPE].label} / ${TOKEN_DATA[pool.tokenB as TOKEN_TYPE].label}`
											)
										}
									</CustomTypography>
								</Stack>
								<Stack direction="row" alignItems="center">
									{
										appState.address === '' ? (
											<Button fullWidth variant="contained" onClick={connect}>CONNECT WALLET</Button>
										) : (
											<>
												<Button fullWidth variant="contained" onClick={handleClickStake}>Stake</Button>
												<Button fullWidth variant="contained" onClick={handleClickUnstake} sx={{ marginLeft: '8px' }}>Unstake</Button>
											</>
										)
									}
								</Stack>
								{
									pool.tokenA && pool.tokenB && (
										<>
											<CustomizedDialogs open={openStakeDlg} pid={index} lpAddr={pool.address} type={TypeDialog.STAKE} pairType={`${TOKEN_DATA[pool.tokenA as TOKEN_TYPE].label}-${TOKEN_DATA[pool.tokenB as TOKEN_TYPE].label}`} handleOpen={handleStakeOpen} />
											<CustomizedDialogs open={openUnStakeDlg} pid={index} lpAddr={pool.address} type={TypeDialog.UNSTAKE} pairType={`${TOKEN_DATA[pool.tokenA as TOKEN_TYPE].label}-${TOKEN_DATA[pool.tokenB as TOKEN_TYPE].label}`} handleOpen={handleUnstakeOpen} />
										</>
									)
								}
							</Grid>
						</Grid>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment >
	);
}

export default Farm;
