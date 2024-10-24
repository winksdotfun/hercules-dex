import alcx from "../assets/images/alcx.svg";
import aieth from "../assets/images/aieth.png";
import aiusd from "../assets/images/aiusd.png";
import ara from "../assets/images/ara.png";
import artmetis from "../assets/images/artmetis.svg";
import ath from "../assets/images/ath.svg";
import barsik from "../assets/images/barsik.png";
import caca from "../assets/images/caca.png";
import cerus from "../assets/images/cerus.png";
import dn from "../assets/images/dn.png";
import emetis from "../assets/images/emetis.png";
import enki from "../assets/images/enki.png";
import froska from "../assets/images/froska.svg";
import fxs from "../assets/images/fxs.png";
import gamefi from "../assets/images/gamefi.png";
import gvec from "../assets/images/gvec.png";
import hera from "../assets/images/hera.png";
import hum from "../assets/images/hum.png";
import jewel from "../assets/images/jewel.png";
import musdc from "../assets/images/musdc.svg";
import musdt from "../assets/images/musdt.svg";
import metis from "../assets/images/metis.png";
import monkex from "../assets/images/monkex.png";
import muttis from "../assets/images/muttis.png";
import pump from "../assets/images/pump.svg";
import sfrax from "../assets/images/sfrax.svg";
import sfrxeth from "../assets/images/sfrxeth.png";
import tethys from "../assets/images/tethys.png";
import torch from "../assets/images/torch.svg";
import vesta from "../assets/images/vesta.png";
import vmetis from "../assets/images/vmetis.png";
import wagmi from "../assets/images/wagmi.png";
import weth from "../assets/images/weth.svg";
import zke from "../assets/images/zke.png";

 const Options = [
   {
     id: 1,
     image: alcx,
     head: "ALCX",
     desc: "Alchemix",
     // address: "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
   },
   {
     id: 2,
     image: aieth,
     head: "aIETH",
     desc: "Alchemix ETH",
     //address: "0xF94BE4401483172dc1F72120c01ace2888EBdfc4",
   },
   {
     id: 3,
     image: aiusd,
     head: "aIUSD",
     desc: "Alchemix USD",
     // address: "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
   },
   {
     id: 4,
     image: ara,
     head: "ARA",
     desc: "AraFi Token",
     address: "0x85b70D7e56BC8C4dDD7a5BB30E59b223DA383E34",
   },
   {
     id: 5,
     image: artmetis,
     head: "artMETIS",
     desc: "Staked Metis Token",
     address: "0x2583A2538272f31e9A15dD12A432B8C96Ab4821d",
   },
   {
     id: 6,
     image: ath,
     head: "ATH",
     desc: "Athena Token",
     address: "0xA4eE142e34d0676Edc2b760DD0016003D99a4ceC",
   },
   {
     id: 7,
     image: barsik,
     head: "BARSIK",
     desc: "BARSIK Token",
     address: "0x0CF2F4Cb2FAAD0FE35eFF943452339c5699D1e5c",
   },
   {
     id: 8,
     image: caca,
     head: "CACA",
     desc: "Caca",
     address: "0xfBae1EAb52af0Ea3d35cB12F1221cE32D377D08E",
   },
   {
     id: 9,
     image: cerus,
     head: "CERUS",
     desc: "CERUS Token",
     address: "0xb0cf600A62C94451b844B5161A57F7ceC4Cef9ae",
   },
   {
     id: 10,
     image: dn,
     head: "DN404",
     desc: "DN404",
     //address: "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
   },
   {
     id: 11,
     image: emetis,
     head: "eMETIS",
     desc: "ENKI Metis",
     address: "0x97a2de3A09F4A4229369ee82c7F76be1a5564661",
   },
   {
     id: 12,
     image: enki,
     head: "ENKI",
     desc: "ENKI Protocol",
     address: "0x096A84536ab84E68ee210561FFD3A038E79736F1",
   },
   {
     id: 13,
     image: froska,
     head: "FROSKA",
     desc: "Froska",
     //address: "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
   },
   {
     id: 14,
     image: fxs,
     head: "FXS",
     desc: "Frax Share",
     //address:'0x2550761D44e709710C15B718B2B73A65151a8488'
   },
   {
     id: 15,
     image: gamefi,
     head: "GAMEFI",
     desc: "Revenant",
     address: "0x966B25D174bE6Ba703E0fF80c68BB6e167236BA2",
   },
   {
     id: 16,
     image: gvec,
     head: "gVEC",
     desc: "Governance VEC Token",
     //address: "0xF9a6d89DCCb139E26da4b9DF00796C980b5975d2",
   },
   {
     id: 17,
     image: hera,
     head: "HERA",
     desc: "HERA Token",
     address: "0x6F05709bc91Bad933346F9E159f0D3FdBc2c9DCE",
   },
   {
     id: 18,
     image: hum,
     head: "HUM",
     desc: "Hummus Token",
     address: "0x4aAC94985cD83be30164DfE7e9AF7C054D7d2121",
   },
   {
     id: 19,
     image: jewel,
     head: "JEWEL",
     desc: "JEWEL Token",
     address: "0x17C09cfC96C865CF546d73365Cedb6dC66986963",
   },
   {
     id: 20,
     image: musdc,
     head: "m.USDC",
     desc: "m.USDC",
     address: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
   },
   {
     id: 21,
     image: musdt,
     head: "m.USDT",
     desc: "m.USDT",
     address: "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",
   },
   {
     id: 22,
     image: metis,
     head: "METIS",
     desc: "Metis",
     address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
   },
   {
     id: 23,
     image: monkex,
     head: "MONKEX",
     desc: "Monkex Token",
     address: "0x186573b175aDF5801cF95Fb06b232ccAB123c6F4",
   },
   { id: 24, image: muttis, head: "MUTTIS", desc: "MUTTIS" },
   {
     id: 25,
     image: pump,
     head: "PUMP",
     desc: "Pumpkin Token",
     //address: "0x2EDE18CB7FeA57F5e8E7e555f80FaB4D49AcA234",
   },
   {
     id: 26,
     image: sfrax,
     head: "sFRAX",
     desc: "Staked FRAX",
     // address: "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
   },
   {
     id: 27,
     image: sfrxeth,
     head: "sfrxETH",
     desc: "Staked Frax Ether",
     // address: "0xD3017943cD7Fe1D7D3eE9BAd909d182639F95eD0",
   },
   {
     id: 28,
     image: tethys,
     head: "TETHYS",
     desc: "TETHYS Token",
     address: "0x69fdb77064ec5c84FA2F21072973eB28441F43F3",
   },
   {
     id: 29,
     image: torch,
     head: "TORCH",
     desc: "Torch",
     address: "0xbB1676046C36BCd2F6fD08d8f60672c7087d9aDF",
   },
   {
     id: 30,
     image: vesta,
     head: "VESTA",
     desc: "VestaDAO",
     //doubt
     address: "0x38A7362Dab9b85Ba605Ff26e2BD82b328BDe99f1",
   },
   { id: 31, image: vmetis, head: "vMETIS", desc: "Vector METIS" },
   {
     id: 32,
     image: wagmi,
     head: "WAGMI",
     desc: "Wagmi Token",
     address: "0xaf20f5f19698f1D19351028cd7103B63D30DE7d7",
   },
   {
     id: 33,
     image: weth,
     head: "WETH",
     desc: "Wrapped ETH",
     address: "0x420000000000000000000000000000000000000A",
   },
   {
     id: 34,
     image: metis,
     head: "WMetis",
     desc: "Wrapped Metis",
     address: "0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481",
   },
   {
     id: 35,
     image: zke,
     head: "ZKE",
     desc: "ZKE Token",
     address: "0xdf020cBd1897133978C7FcDF04B07E69d8934Efc",
   },
 ];





const Commonbases = [
  {
    id: 22,
    image: metis,
    head: "METIS",
    desc: "Metis",
    address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
  },
  {
    id: 20,
    image: musdc,
    head: "m.USDC",
    desc: "m.USDC",
    address: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
  },
  {
    id: 21,
    image: musdt,
    head: "m.USDT",
    desc: "m.USDT",
    address: "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",
  },
  {
    id: 29,
    image: torch,
    head: "TORCH",
    desc: "Torch",
    address: "0xbB1676046C36BCd2F6fD08d8f60672c7087d9aDF",
  },
  {
    id: 33,
    image: weth,
    head: "WETH",
    desc: "Wrapped ETH",
    address: "0x420000000000000000000000000000000000000A",
  },
];

export { Options, Commonbases };