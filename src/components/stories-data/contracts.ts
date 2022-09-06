import { AnyContract } from 'dlc-lib'

export const contracts: AnyContract[] = [
  {
    state: 1,
    temporaryContractId:
      'c46709935b66efb577af784457724946b0ca27ef1467e163a1a7726b8506a1ec',
    contractInfo: {
      totalCollateral: 200000000,
      contractInfo: {
        contractDescriptor: {
          payouts: [
            { outcome: 'a', offerPayout: 200000000 },
            { outcome: 'b', offerPayout: 0 },
            { outcome: 'c', offerPayout: 200000000 },
            { outcome: 'd', offerPayout: 0 },
          ],
        },
        oracleInfo: {
          oracleAnnouncement: {
            announcementSignature:
              '2f2b680a420bacaab41eaa9a98f4c4b6e9c998c9ad609b6df6cb50cdd9e8333738b9ab5875426ca17caddb2e50251506d72046d020ab8daa9425fbe46f829c74',
            oraclePublicKey:
              '22add10cd88c6cbcafe78b3665a280c2b53f58be56f404a9db87d7924033f90c',
            oracleEvent: {
              oracleNonces: [
                'b00b8bc363325ccb09e34477ede9a13a322b535beee6e48338e4b6a46d1269fc',
              ],
              eventMaturityEpoch: 1661822685,
              eventDescriptor: { outcomes: ['a', 'b', 'c', 'd'] },
              eventId: '0',
            },
          },
        },
      },
    },
    offerParams: {
      fundPubkey:
        '02c86030f7074ee07761642781d83951a76ec1fdc22d73bca1b213dcce12fff203',
      changeScriptPubkey: '00141305ba91c05433d274c19eb4c4a3c6c29b98cdd2',
      changeSerialId: 2916015534937744400,
      payoutScriptPubkey: '00148925122c5ad1f3091618e6527b27ccd969f35309',
      payoutSerialId: 706568449347367000,
      inputs: [
        {
          outpoint: {
            txid: '41cd42976ccc7dcc740c42c0e3c2ab896f25780b3a3f10346f2cedb91a6cb2d6',
            vout: 0,
          },
          maxWitnessLen: 107,
          redeemScript: '',
          serialId: 58264254386700740,
          amount: 5000000000,
        },
      ],
      inputAmount: 5000000000,
      collateral: 100000000,
    },
    offerFundingInputsInfo: [
      {
        inputSerialId: 58264254386700740,
        prevTx:
          '020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0401220101ffffffff0200f2052a010000001600144d44585473989864f152d3025fd5a5dad37d122b0000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf90120000000000000000000000000000000000000000000000000000000000000000000000000',
        prevTxVout: 0,
        sequence: 4294967295,
        maxWitnessLen: 107,
        redeemScript: '',
      },
    ],
    fundOutputSerialId: 18077068868522189000,
    feeRatePerVByte: 2,
    contractMaturityBound: 1661822685,
    contractTimeOut: 1662427485,
    isOfferParty: false,
  },
  {
    state: 2,
    temporaryContractId:
      '949f0f764d77f6eb7f6048c733aef8c465c04a18bea528cf4349a37337cb5b92',
    contractInfo: {
      totalCollateral: 200000000,
      contractInfo: {
        contractDescriptor: {
          numDigits: 10,
          payoutFunction: {
            payoutFunctionPieces: [
              {
                endPoint: {
                  eventOutcome: 0,
                  outcomePayout: 0,
                  extraPrecision: 0,
                },
                payoutCurvePiece: {
                  payoutPoints: [
                    {
                      eventOutcome: 3,
                      outcomePayout: 100000000,
                      extraPrecision: 0,
                    },
                  ],
                },
              },
              {
                endPoint: {
                  eventOutcome: 5,
                  outcomePayout: 200000000,
                  extraPrecision: 0,
                },
                payoutCurvePiece: { payoutPoints: [] },
              },
            ],
            lastEndpoint: {
              eventOutcome: 1023,
              outcomePayout: 200000000,
              extraPrecision: 0,
            },
          },
          roundingIntervals: {
            intervals: [{ beginInterval: 0, roundingMod: 1 }],
          },
        },
        oracleInfo: {
          oracleAnnouncement: {
            announcementSignature:
              'a54b33d928917de7f0c08aaaaf049582e287c44254600801e84481bf8cdc5844688abbe5943bbc53997ad75c3b91056274b267d9ea2c70e087ad08e91122dea9',
            oraclePublicKey:
              '22add10cd88c6cbcafe78b3665a280c2b53f58be56f404a9db87d7924033f90c',
            oracleEvent: {
              oracleNonces: [
                'c23dd9c487a162a80f8643d53b6bfac9b1fe953680367e93b833a7fd88eb54a7',
                'f8d202497136c6b3bd664322073ab18af491ce1787dff819f5529406e72a0a8b',
                '4b20824296f0e06da3afc67afd250c4bf09e203465124524daadcdf19ce6c551',
                '19cad791760fea2b685fe61e4f124b5b97fd838bf65bbd8cd529b2404cd1ac22',
                '15409abc1884564116021133e581b98bb96db223b125b55ed6e4c32a9f18bf1c',
                'db711519d210aed51c3396eb70a2f140519a054753586809b04f6e58bd142ed1',
                'bf16ce8e78b03848e50b6a4a6d858b9e03615e52d34765ea9ce1f4a7cbc3e9d3',
                'cf142659c73db1c044f28cc4c996754cddd5708c1033099ec767e8cab7e0a9af',
                '056811cda9dc2fcaa671a201051688760cf29f7b8b616db40c872d8d3a7fe7da',
                '11923e85160e635ca5c086ac737bb6f481e55108ca5a1691dc0f03b8eb3264f2',
              ],
              eventMaturityEpoch: 1661822776,
              eventDescriptor: {
                base: 2,
                isSigned: false,
                unit: 'btc/usd',
                precision: 1,
                nbDigits: 10,
              },
              eventId: '1',
            },
          },
        },
      },
    },
    offerParams: {
      fundPubkey:
        '0268053a94465e30ed0405b2c2760e3a7b7dd4bd3a239c2b4a1c6a09c088e98ae6',
      changeScriptPubkey: '0014aae29a3bac4030906a7e3e8987e1c4ecd5dfb602',
      changeSerialId: 7241023542144640000,
      payoutScriptPubkey: '0014901f26a3a1e0987eccadda4b47a3697b9f934173',
      payoutSerialId: 7247083068059376000,
      inputs: [
        {
          outpoint: {
            txid: 'cd84e4d9dcf2988b152e5cdbd3cc5532804e301bbd0119d48ce326075da8fa75',
            vout: 0,
          },
          maxWitnessLen: 107,
          redeemScript: '',
          serialId: 6705432301100664000,
          amount: 5000000000,
        },
      ],
      inputAmount: 5000000000,
      collateral: 100000000,
    },
    offerFundingInputsInfo: [
      {
        inputSerialId: 6705432301100664000,
        prevTx:
          '020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0401590101ffffffff0200f2052a010000001600144d44585473989864f152d3025fd5a5dad37d122b0000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf90120000000000000000000000000000000000000000000000000000000000000000000000000',
        prevTxVout: 0,
        sequence: 4294967295,
        maxWitnessLen: 107,
        redeemScript: '',
      },
    ],
    fundOutputSerialId: 12297590581180424000,
    feeRatePerVByte: 2,
    contractMaturityBound: 1661822776,
    contractTimeOut: 1662427576,
    isOfferParty: false,
    id: '5cbe467ffee218f23b368cba7513204ecc453fc6be3251f8883d9115126eadb4',
    acceptParams: {
      fundPubkey:
        '032f7960eba98c41d73c5520526734fed479d260af2f7396b5a0b5b7b604a715f4',
      changeScriptPubkey: '0014b5034320576a2e1ad60d032c7bc096de4a3076e3',
      changeSerialId: 6026908520978703,
      payoutScriptPubkey: '0014ee2ebc579cd0a1c85af8a6265f7be6148ab5e24d',
      payoutSerialId: 8836610254052441,
      inputs: [
        {
          outpoint: {
            txid: 'a7fb8e1aa8aa4f340c815ba193a190cf34f1b0205860b916978b366b22c4bb4b',
            vout: 0,
          },
          redeemScript: '',
          maxWitnessLen: 107,
          serialId: 6058958522117559,
          address: 'bcrt1qln539de3tauaqszamqx6lvmf5d5s3u2p4q48vq',
          amount: 99990032,
        },
        {
          outpoint: {
            txid: 'a952143dbcd43c7d735be6152c124c81e0c20fb2b59d292f21cee19ba758c963',
            vout: 0,
          },
          redeemScript: '',
          maxWitnessLen: 107,
          serialId: 3729337794864633,
          address: 'bcrt1qfgv4sftec86kqv678jg74jur3lkcjy8qsk94as',
          amount: 9765,
        },
        {
          outpoint: {
            txid: '251d4f8784f69307fe08db693987f01f0b373b8c64d640bdd4d524839fd5665c',
            vout: 1,
          },
          redeemScript: '',
          maxWitnessLen: 107,
          serialId: 5138673187268547,
          address: 'bcrt1qq4rpc4cqgwu97dguhrtsx79mz2a0647q7crun9',
          amount: 1872,
        },
        {
          outpoint: {
            txid: '4a03e4cd0f0991b9b52de57639f3d85a91c53f49480c838b13e53d58f876cc27',
            vout: 1,
          },
          redeemScript: '',
          maxWitnessLen: 107,
          serialId: 7202492883520633,
          address: 'bcrt1qek0vru9qzsux7th9s0papsjc3m89qjpn3avm9g',
          amount: 1795,
        },
      ],
      collateral: 100000000,
      inputAmount: 100003464,
    },
    outcomeInfo: {
      root: {
        edges: [
          {
            prefix: [0],
            node: {
              edges: [
                {
                  node: {
                    edges: [
                      {
                        node: {
                          edges: [
                            {
                              node: {
                                edges: [
                                  {
                                    node: {
                                      edges: [
                                        {
                                          node: {
                                            edges: [
                                              {
                                                node: {
                                                  edges: [
                                                    {
                                                      node: {
                                                        edges: [
                                                          {
                                                            node: {
                                                              edges: [
                                                                {
                                                                  node: {
                                                                    data: {
                                                                      cetIndex: 0,
                                                                      adaptorSignatureIndex: 0,
                                                                    },
                                                                  },
                                                                  prefix: [0],
                                                                },
                                                                {
                                                                  node: {
                                                                    data: {
                                                                      cetIndex: 1,
                                                                      adaptorSignatureIndex: 1,
                                                                    },
                                                                  },
                                                                  prefix: [1],
                                                                },
                                                              ],
                                                            },
                                                            prefix: [0],
                                                          },
                                                          {
                                                            prefix: [1],
                                                            node: {
                                                              edges: [
                                                                {
                                                                  node: {
                                                                    data: {
                                                                      cetIndex: 2,
                                                                      adaptorSignatureIndex: 2,
                                                                    },
                                                                  },
                                                                  prefix: [0],
                                                                },
                                                                {
                                                                  node: {
                                                                    data: {
                                                                      cetIndex: 3,
                                                                      adaptorSignatureIndex: 3,
                                                                    },
                                                                  },
                                                                  prefix: [1],
                                                                },
                                                              ],
                                                            },
                                                          },
                                                        ],
                                                      },
                                                      prefix: [0],
                                                    },
                                                    {
                                                      prefix: [1],
                                                      node: {
                                                        edges: [
                                                          {
                                                            node: {
                                                              edges: [
                                                                {
                                                                  node: {
                                                                    data: {
                                                                      cetIndex: 4,
                                                                      adaptorSignatureIndex: 4,
                                                                    },
                                                                  },
                                                                  prefix: [0],
                                                                },
                                                                {
                                                                  node: {
                                                                    data: {
                                                                      cetIndex: 5,
                                                                      adaptorSignatureIndex: 5,
                                                                    },
                                                                  },
                                                                  prefix: [1],
                                                                },
                                                              ],
                                                            },
                                                            prefix: [0],
                                                          },
                                                          {
                                                            node: {
                                                              data: {
                                                                cetIndex: 5,
                                                                adaptorSignatureIndex: 6,
                                                              },
                                                            },
                                                            prefix: [1],
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                                prefix: [0],
                                              },
                                              {
                                                node: {
                                                  data: {
                                                    cetIndex: 5,
                                                    adaptorSignatureIndex: 7,
                                                  },
                                                },
                                                prefix: [1],
                                              },
                                            ],
                                          },
                                          prefix: [0],
                                        },
                                        {
                                          node: {
                                            data: {
                                              cetIndex: 5,
                                              adaptorSignatureIndex: 8,
                                            },
                                          },
                                          prefix: [1],
                                        },
                                      ],
                                    },
                                    prefix: [0],
                                  },
                                  {
                                    node: {
                                      data: {
                                        cetIndex: 5,
                                        adaptorSignatureIndex: 9,
                                      },
                                    },
                                    prefix: [1],
                                  },
                                ],
                              },
                              prefix: [0],
                            },
                            {
                              node: {
                                data: {
                                  cetIndex: 5,
                                  adaptorSignatureIndex: 10,
                                },
                              },
                              prefix: [1],
                            },
                          ],
                        },
                        prefix: [0],
                      },
                      {
                        node: {
                          data: { cetIndex: 5, adaptorSignatureIndex: 11 },
                        },
                        prefix: [1],
                      },
                    ],
                  },
                  prefix: [0],
                },
                {
                  node: { data: { cetIndex: 5, adaptorSignatureIndex: 12 } },
                  prefix: [1],
                },
              ],
            },
          },
          {
            node: { data: { cetIndex: 5, adaptorSignatureIndex: 13 } },
            prefix: [1],
          },
        ],
      },
    },
    acceptFundingInputsInfo: [
      {
        inputSerialId: 6058958522117559,
        prevTx:
          '0200000000010182e0193afdeb5952937f1772c1e87624bbca94663b06b0ae87859a179cca18c70000000000feffffff0210baf50500000000160014fce912b7315f79d0405dd80dafb369a36908f14100250d8f00000000160014d90ae07f467a4990860ea1b9c8379884a52cceb50247304402204dceb5b47879db76269776b0ba625a3cb49490ce8274d6c428837da5de7a4ca802200d8695f6029555a412ce48d2fdd32aaef70beba1dcce6304c3cb0c99000813100121036412f59dbdbcaf4684a3d64398911da0a0148044e78e4db4881518697914a3e84c010000',
        prevTxVout: 0,
        sequence: 4294967295,
        maxWitnessLen: 107,
        redeemScript: '',
      },
      {
        inputSerialId: 3729337794864633,
        prevTx:
          '020000000001012bd16c76df8e0a128aaacde79335b5701310ef6a70d983b9a94fc0ee4f74e2ca0000000000feffffff0225260000000000001600144a19582579c1f560335e3c91eacb838fed8910e09fb80295000000001600141f17f5a273ea06a9d57a6ef0bbcc6ac74aec793c024730440220206a82228e34ce292508e88efaed674a0b30d33f699d88c9605ad2e02ad36b12022065343ac6058f981f52f6a6fa6690bd7149180175ace145b655ef1e4f87e46935012102da45caa7873e040ee14526587c1e753ce1ac586071853da9eb49332e224590944c010000',
        prevTxVout: 0,
        sequence: 4294967295,
        maxWitnessLen: 107,
        redeemScript: '',
      },
      {
        inputSerialId: 5138673187268547,
        prevTx:
          '02000000000101b24fe8e43d4da749958e7e2a7a9cfdbc36eaed5856430669e42c84fd604939f60000000000feffffff023959029500000000160014a6c2f2974f953ff0e874f53a420eb7a766584ae9500700000000000016001405461c570043b85f351cb8d70378bb12bafd57c00247304402201a4806b077060df42bb84b6fa8de0a6cfb5ea8a12bd9268d14f2cf3d494f3d1d02203600dd17e9893eac162919ca32a47686e3a53b41c0c539c182898f42e46c05cd01210388019b029215bfc747ddc061a0e6d0036941154efc4b5db6848e76bf19545e164c010000',
        prevTxVout: 1,
        sequence: 4294967295,
        maxWitnessLen: 107,
        redeemScript: '',
      },
      {
        inputSerialId: 7202492883520633,
        prevTx:
          '02000000000101dbadbbcdc7372ba832d322ad50c7f39d23101b30d1aa19373d6b25326048849a0100000000feffffff02908c029500000000160014c14dfc9b9f9aed0e44472b7fa0835ac84c79aae60307000000000000160014cd9ec1f0a014386f2ee583c3d0c2588ece50483302473044022051cee35e7dc405a4e46f1fb9d8c0a6ad4051280fe4638825e4d3d7bba85a13e2022043f9d6cafda75363fcde045c2da2230813da6fef148a5d5b390c3799f1d3518901210366701284aa94584d6b14ff9c2ad8aab9c8e3afec050e9724b4d6efd294eeb55a05010000',
        prevTxVout: 1,
        sequence: 4294967295,
        maxWitnessLen: 107,
        redeemScript: '',
      },
    ],
    acceptRefundSignature:
      '304402201855e92142ebcfd01fb208fb152cd1dd0b068c7e2e8511b222c3e2b9e9c9228002207d59565353a4a37def0cd600bd67f89f92c91992774e71a4caa267568f142df9',
    dlcTransactions: {
      fund: '020000000563c958a79be1ce212f299db5b20fc2e0814c122c15e65b737d3cd4bc3d1452a90000000000ffffffff5c66d59f8324d5d4bd40d6648c3b370b1ff0873969db08fe0793f684874f1d250100000000ffffffff4bbbc4226b368b9716b9605820b0f134cf90a193a15b810c344faaa81a8efba70000000000ffffffff27cc76f8583de5138b830c48493fc5915ad8f33976e52db5b991090fcde4034a0100000000ffffffff75faa85d0726e38cd41901bd1b304e803255ccd3db5c2e158b98f2dcd9e484cd0000000000ffffffff034c0a000000000000160014b5034320576a2e1ad60d032c7bc096de4a3076e35a0f102401000000160014aae29a3bac4030906a7e3e8987e1c4ecd5dfb60254c3eb0b00000000220020af75ff1f3a3b469818550c41d92601c4e19547f90ad604451ebb71ba592fd24900000000',
      cets: [
        '020000000124f6a525663274cb37799700de7585a98ad8bd467dc4564419ee95b3094921c80200000000feffffff0100c2eb0b00000000160014ee2ebc579cd0a1c85af8a6265f7be6148ab5e24d38670d63',
        '020000000124f6a525663274cb37799700de7585a98ad8bd467dc4564419ee95b3094921c80200000000feffffff0255db540a00000000160014ee2ebc579cd0a1c85af8a6265f7be6148ab5e24dabe6960100000000160014901f26a3a1e0987eccadda4b47a3697b9f93417338670d63',
        '020000000124f6a525663274cb37799700de7585a98ad8bd467dc4564419ee95b3094921c80200000000feffffff02003b580800000000160014ee2ebc579cd0a1c85af8a6265f7be6148ab5e24d0087930300000000160014901f26a3a1e0987eccadda4b47a3697b9f93417338670d63',
        '020000000124f6a525663274cb37799700de7585a98ad8bd467dc4564419ee95b3094921c80200000000feffffff0200e1f50500000000160014ee2ebc579cd0a1c85af8a6265f7be6148ab5e24d00e1f50500000000160014901f26a3a1e0987eccadda4b47a3697b9f93417338670d63',
        '020000000124f6a525663274cb37799700de7585a98ad8bd467dc4564419ee95b3094921c80200000000feffffff0255cd2d0300000000160014ee2ebc579cd0a1c85af8a6265f7be6148ab5e24dabf4bd0800000000160014901f26a3a1e0987eccadda4b47a3697b9f93417338670d63',
        '020000000124f6a525663274cb37799700de7585a98ad8bd467dc4564419ee95b3094921c80200000000feffffff0100c2eb0b00000000160014901f26a3a1e0987eccadda4b47a3697b9f93417338670d63',
      ],
      refund:
        '020000000124f6a525663274cb37799700de7585a98ad8bd467dc4564419ee95b3094921c80200000000feffffff0200e1f50500000000160014901f26a3a1e0987eccadda4b47a3697b9f93417300e1f50500000000160014ee2ebc579cd0a1c85af8a6265f7be6148ab5e24db8a11663',
      fundOutputIndex: 2,
      fundScriptPubkey:
        '52210268053a94465e30ed0405b2c2760e3a7b7dd4bd3a239c2b4a1c6a09c088e98ae621032f7960eba98c41d73c5520526734fed479d260af2f7396b5a0b5b7b604a715f452ae',
    },
    acceptAdaptorSignatures: [
      '038839afd3eec5d1c13e29d22fd00727b4e0e1e8ab6638821a2cd2ffd79fce090e0373edcaef4a4e7873d7884b7940eaa4eee96744701bc4fe551031bb9626e1279edf42ab2fde75ee2aebe370eca461d8888ad9ce196c6ee53dddabc93715b73722f92a805bd726e837fd15aa08e0e5beb4f7962bd0030ddafa734acec7fec31703516c689439a34770dead920a9546d9ac588bf7d910be73fa682be4d2d797e993',
      '027b6da81ce9ae9c749dae5050b1c56488843d851f3704052bc05b64ead2863c1703aec9d33e1f0e426203a4068dbedc3b2ae7fb3a7970aa9843bec2652863563e9a0d592d9d0ec0a43e97c8f3eab7272b01f242ceda12b22eab8ca55dea31eb538c756672a682d905c9e9a37fbd07a9174cc178be41946afd15368d68b9449229d66fb7ffd831486dd207ccb7de9e9bbe3b6fc3789cc1ef1cf3d4fcad8950ffc4dd',
      '034823a3817bab910a533cd777ab128d447c44080fcfa71dd753c1f6565066f1cc036a32646d08e184e101fb0790d469cef66f76e7c8ec021033a7d7b4b85956d3cc8600866cda4d89bbd1f5840f875860b44835c0bbba91ec77bac2eb6f3f907f4aaf16c2214d3267b45468103ce17279cb41560bc85e37886cf3349fbef6ab7b10745865e8b2765943bc23d382c5714ccbb980055e5bd58fe0719ba577213838ee',
      '02ada802b727cbd7eabab5ff600d9ac2ff98c7047f75df80912feeb5a8afb06abe0207845fd25f4b9975e1190841e01260ab719046a69bf058ae889cb290d3ba7f2d13183c4b159390a9f55e187e535debaded179eb8d902530af5a3244046781308877ab62f14be2aef95fd2ee0394028eee78c65ce3c6c3589b9edffdbc99bef8fbc49d9e92df2e8e737ffc73abd08922c112ca1adf196c737bd92e343041bc04f',
      '021ae83b0cb863434eb1e38b854f1145d8eb8814ebd30b4b3e62f25d8a6e7ad11d02e9bdb48d4efb8c111d1aa5bc426ef9797ee0df69f09a021834d74d9b4dc7a7c06634f7c4179631ebc2a58259cfa9038710c419059a2389f85776f9ed62e9428058da0491c8cd3d84088f7f3531f8c8b833b78c6319e7514182b808f7a87ff70b0604139287c5120c237f0b700a36e9f79a8f627493bd24fed52040142e8d0277',
      '022cbe984f5e930d8910c72a397d31d820095f4199bca81fe3ae1ad94cfbb7a7d1038994f4c19321957679ff082a1e771f1ff15886c9953c7ffef72f80164a8d366d948f5e9707a2f5bf2f6089fb8a54e0651f48383c1e82447e9621e46bb1af2e716161d2d43f15fe67ca34e902f09b969912f8b4f861a72817d2fb5849426e2fc7400f6f8fcc684915135737e85ae4fb923f0512d852c7b6b7aedea393234b13bd',
      '033ebdcae6a0c53f0038e9a7ced6d4248faf5469f0e7e1c8578be9405ccf03ba7e02781e57bad0d379880a0b83c9739ca85a5debfbec1442bba832a60ee64274421ea151197c725b98d69705dd6a49569b4b98f2152b7cbcc729b06c3135dad35939db04929cb423c9d6e445394f2b47fd23a378918369e1733f4f875be735328764e236ce781934484086e6dba7480cc914f7b99a1e636fa9b86150b7c29dfae044',
      '0217ded87a7142212977f8d9de4b1c811c8c07a108abcd4ce780684e4a320c661a02be83c87975440f4d895eeb085ae91b5d640b6c2dc56f644777bbb34bbce9e348f90c6f95f8e10d4ba992d38e23ed9bd034cb50406ad391181d0f384bf8062f1e530f0afa884c1c5e1169e535d9c4afe768c6619edbc69006132d94241ec2dbed4209ab7bb503a492944f2647b10b9e09de2701a9cfcd6e78d3443aaaf4e3ddba',
      '028b82928c97564fc800f8a9f8fb31411822f3ba9d43cbc6d2a01c90d49f09072c0217e21afceb3c91133888612f623524edec9b99d9bfdd793bd2da429eb13d5444a0425e9e7cb34999bacb2ee0be26658377563130f9ccda02b4fc358e24ff70be92b8914e736fcdc204560b72f0a529d98584d49f700ea514a79138859084ac736234ff9869680e4cc12b5f2b6b90efd86c576f61313cf459cddd4ad9ea3764ea',
      '02a23a93dd9d6bb565a2db15ff13be4ff9ca547933763eb0cd6659e71fa7e4f9fa02eb39bef019f44294c17b01f57aa15acb975f81bda64f72626809d8a03aaf63b43eacd5c3db1f1f7e201bb87800341293c22bc18e131be5c2abb9f1122c5ae2cd1e7d420ca0f37d5c5bd969804a81d86809b90fda55dbb322eb00dc84dab0059ec8e69a595d811f9492afca03318a31acdec9a24bff150c13591d4f9906d01e45',
      '039a2fc8e3ad68a05629f621817b140b4c4ef1f2d2df068d18b73617aa07b415ce03fa7a27cbc3b0d6ebff7f64632c40f36bfc2dda4a5359f67194bd51544fcf47d3d6a0286b26cd607c29bb4d42ebfc07010d50636560593a8c99608245c1eb57e24bc5e0ed028cb141cb9a81cb80cc20ffe8f29c4d87d30f365f6a03c57f9922c0b607a73ef629288b76e207b2b8dabe1374d2c90e8007e732a2d8922ad9ee7903',
      '02bcc383aeb2b06fb098a268c4c860bb6caaf436849f6995d2387dda03946c515b0275d143ad05971907c02e8c240e948931674955999a886b3530bae04bb6cf14810c24409018d5a801a903f67b619b38640c7b8246afcf3ba63e6a3e1a6fd0ab29e4a14f3882edeb9e9386fdee4984761144d1c1a7cbb3396cd7c7743ed9ffe570b4a75ac853fbaebda064689c1f9a59342f62aaee390f03f109bfb735d17ce87e',
      '03d879aba80645e169ac2ce6b0696bf693a7347c106782272c2ee1a928782311d4039e258c144b9cf6b64ea97a78ba6cfd0d4d9833899eb7ad66e5fdc9bbd783dc855e9ff6d4c1dd1837ec1018816309671ed6a523a567928b8a18d5fda50405988b9398888b1b783a0cb225806af7094b6748454dedb7a346afcbc0c1ac524a749f9173fabb113bd202dfac5ac9c7d4ff9c53664e66f73f0918b628926bd9ff8468',
      '030727930cfc6dd2a879956179a05b67c29c30f082ac87fe8fa8d45951f5de96b003022002f8045fb4a8e82e73ab636a84bb14c88ff3edb95b9bb53fd1337140e64e4e4391ae7bf4d8a79fe09d2bd99ef7ea0750af6554e77347e6ccee501fab518f243ead046f956fe3407a83cbe9f72bd4fdcd66878db9cedbc2630a9e894be67aa94da859bcbd5303b94eefb76ade09094277df6df9236a8d973a922e0e21e2d5',
    ],
  },
]
