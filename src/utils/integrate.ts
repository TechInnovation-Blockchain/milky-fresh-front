import Milky from 'config/contracts/Milky'
import MilkyRouter from 'config/contracts/MilkyRouter'
import MilkyFactory from 'config/contracts/MilkyFactory'
import MilkyPair from 'config/contracts/MilkyPair'
import MasterChef from 'config/contracts/MasterChef'
import IERC20 from 'config/contracts/IERC20'
import AggregatorV3 from 'config/contracts/AggregatorV3'
import { str2BigNumber } from './numbers'
import toast from "react-hot-toast"
import {
    BigNumber,
    ContractReceipt,
    ethers,
} from "ethers"

import { ContractInformation, NetworkId } from 'config/constants/types'
import BNB from 'config/contracts/BNB'
import { UserState } from 'bnc-onboard/dist/src/interfaces'

import milkyLogo from "assets/images/milky.png"
import bnbLogo from "assets/images/bnb.png"
import busdLogo from "assets/images/busd.png"
import wsgLogo from "assets/images/wsg.png"
import usdtLogo from "assets/images/usdt.png"

import { NetworkRPC } from 'config/constants/common'
import { timeStamp } from 'console'

export enum TOKEN_TYPE {
    BNB = 'bnb',
    MILKY = 'milky',
    BUSD = 'busd',
    WSG = 'wsg',
    USDT = 'usdt',
}

export const TOKEN_LIST = [
    TOKEN_TYPE.MILKY,
    TOKEN_TYPE.BNB
]

export const TOKEN_DATA = {
    [TOKEN_TYPE.MILKY as TOKEN_TYPE]: {
        value: 'milky',
        label: 'MILKY',
        address: Milky.address[getNetworkId()],
        image: milkyLogo,
        chainlink: ''
    },
    [TOKEN_TYPE.BNB as TOKEN_TYPE]: {
        value: 'bnb',
        label: 'BNB',
        address: BNB.address[getNetworkId()],
        image: bnbLogo,
        chainlink: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526'
    },
    [TOKEN_TYPE.BUSD as TOKEN_TYPE]: {
        value: 'busd',
        label: 'BUSD',
        address: '',
        image: busdLogo,
        chainlink: '0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa'
    },
    [TOKEN_TYPE.USDT as TOKEN_TYPE]: {
        value: 'usdt',
        label: 'USDT',
        address: '',
        image: usdtLogo,
        chainlink: '0xEca2605f0BCF2BA5966372C99837b1F182d3D620'
    },
    [TOKEN_TYPE.WSG as TOKEN_TYPE]: {
        value: 'wsg',
        label: 'WSG',
        address: '',
        image: wsgLogo,
        chainlink: ''
    }
}

export const TOKEN_PAIR = [
    {
        value: 'milky/bnb',
        label: 'MILKY/BNB',
        key0: { value: TOKEN_TYPE.MILKY, label: 'MILKY', image: milkyLogo },
        key1: { value: TOKEN_TYPE.BNB, label: 'BNB', image: bnbLogo }
    },
    {
        value: 'busd/bnb',
        label: 'BUSD/BNB',
        key0: { value: TOKEN_TYPE.BUSD, label: 'BUSD', image: busdLogo },
        key1: { value: TOKEN_TYPE.BNB, label: 'BNB', image: bnbLogo }
    },
    {
        value: 'wsg/bnb',
        label: 'WSG/BNB',
        key0: { value: TOKEN_TYPE.WSG, label: 'WSG', image: wsgLogo },
        key1: { value: TOKEN_TYPE.BNB, label: 'BNB', image: bnbLogo }
    },
    {
        value: 'usdt/busd',
        label: 'USDT/BUSD',
        key0: { value: TOKEN_TYPE.USDT, label: 'USDT', image: usdtLogo },
        key1: { value: TOKEN_TYPE.BUSD, label: 'BUSD', image: busdLogo }
    },
    {
        value: 'milky/wsg',
        label: 'MILKY/WSG',
        key0: { value: TOKEN_TYPE.MILKY, label: 'MILKY', image: milkyLogo },
        key1: { value: TOKEN_TYPE.WSG, label: 'WSG', image: wsgLogo }
    }
]

export const CONTRACT_TABLE = {
    [TOKEN_TYPE.BNB]: BNB,
    [TOKEN_TYPE.MILKY]: Milky,
    // [TOKEN_TYPE.BUSD]: BUSD,
    // [TOKEN_TYPE.WSG]: WSG,
    // [TOKEN_TYPE.USDT]: USDT,
} as {
        [key in TOKEN_TYPE]: ContractInformation
    }

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

var walletProvider: ethers.providers.Web3Provider
var JsonProvider = new ethers.providers.JsonRpcProvider(
    NetworkRPC[getNetworkId()] as string
)

const getDeadlineTime = async (deadline: number) => {
    const blockNumber = await JsonProvider.getBlockNumber()
    const timeStamp = await (await JsonProvider.getBlock(blockNumber)).timestamp
    return timeStamp + deadline * 60
}

export function setupProvider(userState: any) {
    if (userState != null) {
        walletProvider = new ethers.providers.Web3Provider(
            userState.provider
        )
        JsonProvider = new ethers.providers.JsonRpcProvider(
            NetworkRPC[getNetworkId()] as string
        )
    }
}

export function getNetworkId() {
    return (walletProvider && walletProvider.network ? walletProvider.network.chainId : NetworkId.BscTestnet) as NetworkId
}

export async function getAddress() {
    return walletProvider ? (await walletProvider.getSigner().getAddress()).toString() : ''
}

export async function getBalance() {
    return walletProvider ? (await walletProvider.getBalance(getAddress())).toString() : '0'
}

export function getSigner() {
    return walletProvider.getSigner()
}

export async function getDecimalFunc(token: TOKEN_TYPE): Promise<number> {
    if (!CONTRACT_TABLE[token]) return 0

    const contract = new ethers.Contract(
        CONTRACT_TABLE[token].address[getNetworkId()],
        CONTRACT_TABLE[token].abi,
        JsonProvider
    )

    return await contract.decimals()
}

export async function getPairData() {
    const contractFactory = new ethers.Contract(
        MilkyFactory.address[getNetworkId()],
        MilkyFactory.abi,
        JsonProvider
    )

    const result = []
    for (let i = 0; i < TOKEN_PAIR.length; i++) {
        const tokenPair = TOKEN_PAIR[i]
        if (!TOKEN_DATA[tokenPair.key0.value] ||
            !TOKEN_DATA[tokenPair.key1.value] ||
            TOKEN_DATA[tokenPair.key0.value].address === '' ||
            TOKEN_DATA[tokenPair.key1.value].address === '') {
            continue
        }
        const pairAddress = await contractFactory.getPair(TOKEN_DATA[tokenPair.key0.value].address, TOKEN_DATA[tokenPair.key1.value].address) as string
        if (pairAddress !== ZERO_ADDRESS) {
            const contractPair = new ethers.Contract(
                pairAddress,
                MilkyPair.abi,
                JsonProvider
            )
            const balance = await contractPair.balanceOf(getAddress()) as BigNumber
            if (!balance.isZero()) {
                result.push(tokenPair)
            }
        }
    }

    return result
}

export async function getDecimalToken(token: string): Promise<number> {
    const contract = new ethers.Contract(
        token,
        IERC20.abi,
        JsonProvider
    )

    return await contract.decimals()
}

export async function getLpData(tokenA: TOKEN_TYPE, tokenB: TOKEN_TYPE, address: string): Promise<any> {
    if (!CONTRACT_TABLE[tokenA] || !CONTRACT_TABLE[tokenB]) return null

    const pairAddress = await getPairAddress(tokenA, tokenB)
    const pairContract = new ethers.Contract(
        pairAddress,
        MilkyPair.abi,
        JsonProvider
    )

    const { _reserve0, _reserve1 } = await pairContract.getReserves()

    const contract = new ethers.Contract(
        MilkyFactory.address[getNetworkId()],
        MilkyFactory.abi,
        JsonProvider
    )

    const addressA = CONTRACT_TABLE[tokenA].address[getNetworkId()]
    const addressB = CONTRACT_TABLE[tokenB].address[getNetworkId()]

    const lpAddress = await contract.getPair(addressA, addressB)

    const lpContract = new ethers.Contract(
        lpAddress,
        MilkyPair.abi,
        JsonProvider
    )

    const lpBalance = await lpContract.balanceOf(address)
    const lpTotalSupply = await lpContract.totalSupply()

    const decimals = await getDecimalToken(lpAddress)

    let _reserveA = 0.0, _reserveB = 0.0
    const token0 = await pairContract.token0()
    if (addressA === token0) {
        _reserveA = formatDecimals(_reserve1, await getDecimalToken(addressB))
        _reserveB = formatDecimals(_reserve0, await getDecimalToken(addressA))
    } else {
        _reserveA = formatDecimals(_reserve1, await getDecimalToken(addressA))
        _reserveB = formatDecimals(_reserve0, await getDecimalToken(addressB))
    }
    const data: any = {
        lpRealBalance: lpBalance,
        lpBalance: formatDecimals(lpBalance, decimals).toString(),
        lpTotalSupply: formatDecimals(lpTotalSupply, decimals).toString(),
        reserveA: _reserveA,
        reserveB: _reserveB
    }

    return data
}

export async function getPairAddress(tokenA: TOKEN_TYPE, tokenB: TOKEN_TYPE): Promise<string> {
    if (!CONTRACT_TABLE[tokenA]) return ''
    if (!CONTRACT_TABLE[tokenB]) return ''

    const contract = new ethers.Contract(
        MilkyFactory.address[getNetworkId()],
        MilkyFactory.abi,
        JsonProvider
    )

    const address0 = CONTRACT_TABLE[tokenA].address[getNetworkId()]
    const address1 = CONTRACT_TABLE[tokenB].address[getNetworkId()]

    return await contract.getPair(address0, address1)
}

export async function getRateFromPair(tokenA: TOKEN_TYPE, tokenB: TOKEN_TYPE): Promise<number> {
    if (!CONTRACT_TABLE[tokenA]) return 0
    if (!CONTRACT_TABLE[tokenB]) return 0

    const address0 = CONTRACT_TABLE[tokenA].address[getNetworkId()]
    const address1 = CONTRACT_TABLE[tokenB].address[getNetworkId()]

    const pairAddress = await getPairAddress(tokenA, tokenB) as string
    if (pairAddress === ZERO_ADDRESS) {
        return 0
    }
    const pairContract = new ethers.Contract(
        pairAddress,
        MilkyPair.abi,
        JsonProvider
    )

    const token0 = await pairContract.token0() as string
    if (token0 === ZERO_ADDRESS) {
        return 0
    }
    const { _reserve0, _reserve1 } = await pairContract.getReserves()

    if (BigNumber.from(_reserve0).isZero() || BigNumber.from(_reserve1).isZero()) {
        return 0
    } else {
        let result = 0
        if (address0 === token0) {
            result = formatDecimals(_reserve0, await getDecimalToken(address0)) / formatDecimals(_reserve1, await getDecimalToken(address1))
        } else {
            result = formatDecimals(_reserve1, await getDecimalToken(address1)) / formatDecimals(_reserve0, await getDecimalToken(address0))
        }
        return result
    }
}

export async function approve(address: string, to: string, amount: string | BigNumber, decimal: number) {
    const contract = new ethers.Contract(
        address,
        IERC20.abi,
        getSigner()
    )

    const amountBigNumber = amount instanceof BigNumber ? amount : str2BigNumber(amount, decimal)

    try {
        let tx = await contract.approve(to, amountBigNumber)
        let receipt: ContractReceipt = await tx.wait()

        const events = receipt.events
        if (events && events.length > 0) {
            toast.success("Token approved successfully.")
        }
    } catch (error: any) {
        switch (error.code) {
            case 4001:
                break
            case "INSUFFICIENT_FUNDS":
                toast.error("Insufficient fund in your wallet.")
                break
            default:
                toast.error("Token approved failed.")
                break
        }
    }
}

export async function approveLP(lpToken: string, amount: string) {
    await approve(lpToken, MasterChef.address[getNetworkId()], amount, await getDecimalToken(lpToken))
}

export async function approveToken(token: TOKEN_TYPE, amount: string) {
    if (!CONTRACT_TABLE[token] || !CONTRACT_TABLE[token]) return
    await approve(CONTRACT_TABLE[token].address[getNetworkId()], MilkyRouter.address[getNetworkId()], amount, await getDecimalFunc(token))
}

export async function getPairDataFromLpAddr(lpAddr: string): Promise<any> {
    const contract = new ethers.Contract(
        lpAddr,
        MilkyPair.abi,
        JsonProvider
    )

    const token0 = await contract.token0() as string
    const token1 = await contract.token1() as string
    let tokenA = '', tokenB = ''

    for (let i = 0; i < TOKEN_LIST.length; i++) {
        const tokenData = TOKEN_DATA[TOKEN_LIST[i]]
        if (tokenData.address === token0) {
            tokenA = tokenData.value ? tokenData.value : ''
        }
        if (tokenData.address === token1) {
            tokenB = tokenData.value ? tokenData.value : ''
        }
    }

    return {
        tokenA: tokenA,
        tokenB: tokenB
    }
}

export async function getRewardsPerDay(pid: number) {
    const contract = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        JsonProvider
    )
    const totalAllocPoint = await contract.totalAllocPoint() as BigNumber
    if (totalAllocPoint.isZero()) {
        return 0
    }

    const pool = await contract.poolInfo(pid)
    const latestBlockNumber = await JsonProvider.getBlockNumber()
    const timeDuration = (await JsonProvider.getBlock(latestBlockNumber)).timestamp - (await JsonProvider.getBlock((pool.lastRewardBlock as BigNumber).toNumber())).timestamp

    const multiplier = await contract.getMultiplier(pool.lastRewardBlock, latestBlockNumber) as BigNumber
    const milkyPerBlock = await contract.milkyPerBlock() as BigNumber

    const result = multiplier.mul(milkyPerBlock).mul(pool.allocPoint as BigNumber).mul(BigNumber.from(3600 * 24)).div(totalAllocPoint.mul(BigNumber.from(timeDuration === 0 ? 1 : timeDuration)))
    return formatDecimals(result, 18)
}

export async function getTokenPrice(token: TOKEN_TYPE) {
    if (!TOKEN_DATA[token] || TOKEN_DATA[token].chainlink === '') {
        return 0
    }

    const contractAggregator = new ethers.Contract(
        AggregatorV3.address[getNetworkId()],
        AggregatorV3.abi,
        JsonProvider
    )

    const { answer } = await contractAggregator.latestRoundData()
    return formatDecimals(answer, await contractAggregator.decimals())
}

export async function getAllPairsLength() {
    const contractFactory = new ethers.Contract(
        MilkyFactory.address[getNetworkId()],
        MilkyFactory.abi,
        JsonProvider
    )

    return await contractFactory.allPairsLength()
}

export async function getTotalLiquidity() {
    const contract = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        JsonProvider
    )

    const poolLength = ((await contract.poolLength()) as BigNumber).toNumber()
    let totalValue = 0.0
    for (let i = 0; i < poolLength; i++) {
        totalValue += await getCurrentPoolTVL(i)
    }

    return totalValue
}

export async function getCurrentMilkyPrice() {
    const contract = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        JsonProvider
    )

    const poolLength = ((await contract.poolLength()) as BigNumber).toNumber()

    let index = -1
    for (let i = 0; i < poolLength; i++) {
        const pool = await contract.poolInfo(i)
        if (pool.lpToken === TOKEN_DATA[TOKEN_TYPE.MILKY].address) {
            continue
        }
        if (BigNumber.from(pool.allocPoint).toNumber() === 2000) {
            const pairData = await getPairDataFromLpAddr(pool.lpToken)
            if ((pairData.tokenA === TOKEN_TYPE.BNB && pairData.tokenB === TOKEN_TYPE.MILKY)
                || (pairData.tokenB === TOKEN_TYPE.BNB && pairData.tokenA === TOKEN_TYPE.MILKY)) {
                index = i
                break
            }
        }
    }

    const totalAllocPoint = await contract.totalAllocPoint() as BigNumber
    if (totalAllocPoint.isZero()) {
        return 0
    }

    if (index === -1) return 0

    const pool = await contract.poolInfo(index)
    const lpAddress = pool.lpToken as string
    const contractLp = new ethers.Contract(
        lpAddress,
        MilkyPair.abi,
        JsonProvider
    )

    const data = await getPairDataFromLpAddr(lpAddress)
    const { _reserve0, _reserve1 } = await contractLp.getReserves()

    const reserve0Float = formatDecimals(_reserve0, await getDecimalToken(lpAddress))
    const reserve1Float = formatDecimals(_reserve1, await getDecimalToken(lpAddress))

    let tokenAPrice = await getTokenPrice(data.tokenA as TOKEN_TYPE)
    let tokenBPrice = await getTokenPrice(data.tokenB as TOKEN_TYPE)

    if (data.tokenA === TOKEN_TYPE.BNB || data.tokenB === TOKEN_TYPE.MILKY) {
        return tokenAPrice * reserve0Float / reserve1Float
    } else {
        return tokenBPrice * reserve1Float / reserve0Float
    }
}

export async function getCurrentPoolTVL(pid: number) {
    const contractMaster = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        JsonProvider
    )
    const totalAllocPoint = await contractMaster.totalAllocPoint() as BigNumber
    if (totalAllocPoint.isZero()) {
        return 0
    }

    const pool = await contractMaster.poolInfo(pid)
    const lpAddress = pool.lpToken as string
    const contractLp = new ethers.Contract(
        lpAddress,
        MilkyPair.abi,
        JsonProvider
    )

    const data = await getPairDataFromLpAddr(lpAddress)
    const { _reserve0, _reserve1 } = await contractLp.getReserves()

    const reserve0Float = formatDecimals(_reserve0, await getDecimalToken(lpAddress))
    const reserve1Float = formatDecimals(_reserve1, await getDecimalToken(lpAddress))

    let tokenAPrice = await getTokenPrice(data.tokenA as TOKEN_TYPE)
    let tokenBPrice = await getTokenPrice(data.tokenB as TOKEN_TYPE)

    let tokenAValue = tokenAPrice * reserve0Float
    let tokenBValue = tokenBPrice * reserve1Float

    if (tokenAValue === 0) {
        tokenAValue = tokenBValue
    } else if (tokenBValue === 0) {
        tokenBValue = tokenAValue
    }

    const liquidityTvl = tokenAValue + tokenBValue
    return parseFloat((liquidityTvl * (pool.allocPoint as BigNumber).toNumber() / totalAllocPoint.toNumber()).toFixed(6))
}

export async function getCurrentPoolAPR(tvl: number, rewards: number) {
    if (tvl === 0 || rewards === 0) {
        return 0
    }
    const rate = await getRateFromPair(TOKEN_TYPE.MILKY, TOKEN_TYPE.BNB)
    if (rate === 0) {
        return 0
    }
    const bnbPrice = await getTokenPrice(TOKEN_TYPE.BNB)
    return parseFloat((rewards * 365 / rate * bnbPrice / tvl * 100).toFixed(2))
}

export async function getPoolDataFromAddress(address: string): Promise<any> {
    const contract = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        JsonProvider
    )

    const poolLength = ((await contract.poolLength()) as BigNumber).toNumber()

    let poolDataList = []

    for (let i = 0; i < poolLength; i++) {
        const pool = await contract.poolInfo(i)
        if (pool.lpToken === TOKEN_DATA[TOKEN_TYPE.MILKY].address) {
            continue
        }
        if (pool.lpToken === address) {
            const pairData = await getPairDataFromLpAddr(pool.lpToken)
            poolDataList.push({
                address: pool.lpToken,
                tokenA: pairData.tokenA,
                tokenB: pairData.tokenB,
                allocPoint: pool.allocPoint,
                lastRewardBlock: pool.lastRewardBlock,
                pid: i,
            })
        }
    }

    return poolDataList
}

export async function getPoolDataFromPoint(point: number): Promise<any> {
    const contract = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        JsonProvider
    )

    const poolLength = ((await contract.poolLength()) as BigNumber).toNumber()

    let poolDataList = []

    for (let i = 0; i < poolLength; i++) {
        const pool = await contract.poolInfo(i)
        if (pool.lpToken === TOKEN_DATA[TOKEN_TYPE.MILKY].address) {
            const pairData = await getPairDataFromLpAddr(pool.lpToken)
            poolDataList.push({
                address: pool.lpToken,
                tokenA: pairData.tokenA,
                tokenB: pairData.tokenB,
                allocPoint: pool.allocPoint,
                lastRewardBlock: pool.lastRewardBlock,
                pid: i,
            })
        }
        if (BigNumber.from(pool.allocPoint).toNumber() === point) {
            const pairData = await getPairDataFromLpAddr(pool.lpToken)
            poolDataList.push({
                address: pool.lpToken,
                tokenA: pairData.tokenA,
                tokenB: pairData.tokenB,
                allocPoint: pool.allocPoint,
                lastRewardBlock: pool.lastRewardBlock,
                pid: i,
            })
        }
    }

    return poolDataList
}

export async function removeLiquidity(tokenA: TOKEN_TYPE, tokenB: TOKEN_TYPE, liquidity: BigNumber, address: string, deadline: number) {
    if (!CONTRACT_TABLE[tokenA] || !CONTRACT_TABLE[tokenB]) return

    const contract = new ethers.Contract(
        MilkyRouter.address[getNetworkId()],
        MilkyRouter.abi,
        getSigner()
    )

    const lpAddress = await getPairAddress(tokenA, tokenB) as string
    const pairContract = new ethers.Contract(
        lpAddress,
        MilkyPair.abi,
        getSigner()
    )

    try {
        let tx;
        tx = await pairContract.approve(MilkyRouter.address[getNetworkId()], liquidity)
        await tx.wait()
        if (tokenA === TOKEN_TYPE.BNB) {
            tx = await contract.removeLiquidityETH(
                CONTRACT_TABLE[tokenB].address[getNetworkId()],
                liquidity,
                0,
                0,
                address,
                BigNumber.from(await getDeadlineTime(deadline))
            )
        } else if (tokenB === TOKEN_TYPE.BNB) {
            tx = await contract.removeLiquidityETH(
                CONTRACT_TABLE[tokenA].address[getNetworkId()],
                liquidity,
                0,
                0,
                address,
                BigNumber.from(await getDeadlineTime(deadline))
            )
        } else {
            tx = await contract.removeLiquidity(
                CONTRACT_TABLE[tokenA].address[getNetworkId()],
                CONTRACT_TABLE[tokenB].address[getNetworkId()],
                liquidity,
                0,
                0,
                address,
                BigNumber.from(await getDeadlineTime(deadline))
            )
        }

        let receipt: ContractReceipt = await tx.wait()

        const events = receipt.events
        if (events && events.length > 0) {
            toast.success("Remove Liquidity successfully.")
        }
    } catch (error: any) {
        switch (error.code) {
            case 4001:
                break
            case "INSUFFICIENT_FUNDS":
                toast.error("Insufficient fund in your wallet.")
                break
            default:
                toast.error("Remove Liquidity failed.")
                break
        }
    }
}

export async function addLiquidity(tokenA: TOKEN_TYPE, tokenB: TOKEN_TYPE, amountA: string, amountB: string, address: string, deadline: number) {
    if (!CONTRACT_TABLE[tokenA] || !CONTRACT_TABLE[tokenB]) return

    const contractRouter = new ethers.Contract(
        MilkyRouter.address[getNetworkId()],
        MilkyRouter.abi,
        getSigner(),
    )

    try {
        let tx;
        if (tokenA === TOKEN_TYPE.BNB) {
            await approveToken(tokenB, amountB)
            const amountBigNumber = str2BigNumber(amountB, await getDecimalFunc(tokenB))
            tx = await contractRouter.addLiquidityETH(
                Milky.address[getNetworkId()],
                amountBigNumber,
                0,
                0,
                address,
                BigNumber.from(await getDeadlineTime(deadline)),
                {
                    value: ethers.utils.parseEther(amountA)
                }
            )
        } else if (tokenB === TOKEN_TYPE.BNB) {
            await approveToken(tokenA, amountA)
            const amountBigNumber = str2BigNumber(amountA, await getDecimalFunc(tokenA))
            tx = await contractRouter.addLiquidityETH(
                Milky.address[getNetworkId()],
                amountBigNumber,
                0,
                0,
                address,
                BigNumber.from(await getDeadlineTime(deadline)),
                {
                    value: ethers.utils.parseEther(amountB)
                }
            )
        } else {
            await approveToken(tokenA, amountA)
            const amountABigNumber = str2BigNumber(amountA, await getDecimalFunc(tokenA))
            const amountBBigNumber = str2BigNumber(amountB, await getDecimalFunc(tokenB))
            tx = await contractRouter.addLiquidity(
                CONTRACT_TABLE[tokenA].address[getNetworkId()],
                CONTRACT_TABLE[tokenB].address[getNetworkId()],
                amountABigNumber,
                amountBBigNumber,
                0,
                0,
                address,
                BigNumber.from(await getDeadlineTime(deadline))
            )
        }

        let receipt: ContractReceipt = await tx.wait()

        const events = receipt.events
        if (events && events.length > 0) {
            toast.success("Add Liquidity successfully.")
        }
    } catch (error: any) {
        switch (error.code) {
            case 4001:
                break
            case "INSUFFICIENT_FUNDS":
                toast.error("Insufficient fund in your wallet.")
                break
            default:
                toast.error("Add Liquidity failed.")
                break
        }
    }
}

export async function getTokenBalance(value: TOKEN_TYPE, address: string): Promise<number> {
    if (!CONTRACT_TABLE[value] || !CONTRACT_TABLE[value]) return 0

    const contract = new ethers.Contract(
        CONTRACT_TABLE[value].address[getNetworkId()],
        CONTRACT_TABLE[value].abi,
        JsonProvider,
    )


    return formatDecimals(await contract.balanceOf(address), await getDecimalFunc(value))
}

export async function getPendingMilky(pid: number, lpAddr: string) {
    const contract = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        getSigner()
    )

    return formatDecimals(await contract.pendingMilky(pid, getAddress()), await getDecimalToken(lpAddr))
}

export async function getRewardMilkyTokens(pid: number, address: string, amount: string | BigNumber) {

    await approve(address, MasterChef.address[getNetworkId()], amount, await getDecimalToken(address))

    const contract = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        getSigner()
    )

    const amountBigNumber = amount instanceof BigNumber ? amount : str2BigNumber(amount, await getDecimalToken(address))

    try {
        let tx = await contract.deposit(pid, amountBigNumber)

        let receipt: ContractReceipt = await tx.wait()

        const events = receipt.events
        if (events && events.length > 0) {
            toast.success("Successfully withdraw Milky tokens")

        }
    } catch (error: any) {
        switch (error.code) {
            case 4001:
                break
            case "INSUFFICIENT_FUNDS":
                toast.error("Insufficient fund in your wallet.")
                break
            default:
                toast.error("Failed Withdraw Milky tokens.")
                break
        }
    }
}

export async function unstakeTokensFromPool(pid: number, address: string, amount: string | BigNumber) {

    const contract = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        getSigner()
    )

    const amountBigNumber = amount instanceof BigNumber ? amount : str2BigNumber(amount, await getDecimalToken(address))

    try {
        let tx = await contract.withdraw(pid, amountBigNumber)

        let receipt: ContractReceipt = await tx.wait()

        const events = receipt.events
        if (events && events.length > 0) {
            toast.success("Successfully unstake LP tokens")
        }
    } catch (error: any) {
        switch (error.code) {
            case 4001:
                break
            default:
                toast.error("Failed unstake LP tokens.")
                break
        }
    }
}

export async function stakeTokensToPool(pid: number, amount: string, lpAddress: string, balance: number) {
    const lpContract = new ethers.Contract(
        lpAddress,
        IERC20.abi,
        getSigner()
    )

    const allowance = formatDecimals(await lpContract.allowance(getAddress(), MasterChef.address[getNetworkId()]), await getDecimalToken(lpAddress))
    if (allowance < parseFloat(amount)) {
        await approveLP(lpAddress, balance.toString())
    }

    const contract = new ethers.Contract(
        MasterChef.address[getNetworkId()],
        MasterChef.abi,
        getSigner()
    )

    const amountBigNumber = str2BigNumber(amount, await getDecimalToken(lpAddress))

    try {
        let tx = await contract.deposit(pid, amountBigNumber)

        let receipt: ContractReceipt = await tx.wait()

        const events = receipt.events
        if (events && events.length > 0) {
            toast.success("Deposit LP tokens successfully.")
        }
    } catch (error: any) {
        switch (error.code) {
            case 4001:
                break
            case "INSUFFICIENT_FUNDS":
                toast.error("Insufficient fund in your wallet.")
                break
            default:
                toast.error("Deposit LP tokens failed.")
                break
        }
    }
}

export async function getLPBalance(token: string): Promise<any> {
    const contract = new ethers.Contract(
        token,
        MilkyPair.abi,
        JsonProvider
    )

    if (await getAddress() === '') {
        return {
            realBalance: BigNumber.from(0),
            balance: 0
        }
    }

    const balance = await contract.balanceOf(getAddress())
    return {
        realBalance: balance,
        balance: formatDecimals(balance, 18)
    }
}

export async function getPoolBalance(token: string): Promise<any> {
    const contract = new ethers.Contract(
        token,
        MilkyPair.abi,
        JsonProvider
    )

    const balance = await contract.balanceOf(MasterChef.address[getNetworkId()])
    return {
        realBalance: balance,
        balance: formatDecimals(balance, 18)
    }
}

export async function swapTokensToEth(tokenA: TOKEN_TYPE, tokenB: TOKEN_TYPE, amountIn: string, amountOutMin: string, address: string, slippage: number, deadline: number) {
    if (!CONTRACT_TABLE[tokenA] || !CONTRACT_TABLE[tokenB]) return 0

    // console.log('signer', getSigner())

    const contractRouter = new ethers.Contract(
        MilkyRouter.address[getNetworkId()],
        MilkyRouter.abi,
        getSigner(),
    )

    const decimalsA = await getDecimalFunc(tokenA)

    const minimum = (parseFloat(amountIn) * (100 - slippage) / 100).toString()

    try {
        let tx = null
        if (tokenA === TOKEN_TYPE.BNB) {
            tx = await contractRouter.swapExactETHForTokens(
                str2BigNumber(minimum, decimalsA),
                [CONTRACT_TABLE[tokenA].address[getNetworkId()], CONTRACT_TABLE[tokenB].address[getNetworkId()]],
                address,
                BigNumber.from(await getDeadlineTime(deadline)),
                { value: ethers.utils.parseEther(amountIn) }
            )
        } else if (tokenB === TOKEN_TYPE.BNB) {
            await approveToken(tokenA, amountIn)
            tx = await contractRouter.swapExactTokensForETH(
                str2BigNumber(amountIn, decimalsA),
                str2BigNumber(minimum, decimalsA),
                [CONTRACT_TABLE[tokenA].address[getNetworkId()], CONTRACT_TABLE[tokenB].address[getNetworkId()]],
                address,
                BigNumber.from(await getDeadlineTime(deadline)),
            )
        } else {
            await approveToken(tokenA, amountIn)
            tx = await contractRouter.swapExactTokensForTokens(
                str2BigNumber(amountIn, decimalsA),
                str2BigNumber(minimum, decimalsA),
                [CONTRACT_TABLE[tokenA].address[getNetworkId()], CONTRACT_TABLE[tokenB].address[getNetworkId()]],
                address,
                BigNumber.from(await getDeadlineTime(deadline)),
            )
        }

        let receipt: ContractReceipt = await tx.wait()
        const events = receipt.events
        if (events && events.length > 0) {
            toast.success("Swap successfully.")
        }
    } catch (error: any) {
        switch (error.code) {
            case 4001:
                break
            case "INSUFFICIENT_FUNDS":
                toast.error("Insufficient fund in your wallet.")
                break
            default:
                toast.error("Swap failed.")
                break
        }
    }
}

export function formatDecimals(number: BigNumber | string, decimals: number, rounded: number = 6): number {
    let strNumber = BigNumber.from(number === '' ? 0 : number).toString()
    if (strNumber.length <= decimals) {
        strNumber = '0'.repeat(decimals + 1 - strNumber.length) + strNumber
    }
    const dp = strNumber.length - decimals
    const result = parseFloat(strNumber.substring(0, dp) + '.' + strNumber.substring(dp, dp + rounded))
    return !isNaN(result) ? result : 0
}
