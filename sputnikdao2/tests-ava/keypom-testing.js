const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

async function daoFn(){
	// Initiate connection to the NEAR testnet blockchain.
	const network = "testnet"
	const CREDENTIALS_DIR = ".near-credentials";
	const credentialsPath =  path.join(homedir, CREDENTIALS_DIR);
	
	let keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
	
	let nearConfig = {
	    networkId: network,
	    keyStore: keyStore,
	    nodeUrl: `https://rpc.${network}.near.org`,
	    walletUrl: `https://wallet.${network}.near.org`,
	    helperUrl: `https://helper.${network}.near.org`,
	    explorerUrl: `https://explorer.${network}.near.org`,
	};
	
	let near = await connect(nearConfig);
	const councilMember = await near.account("minqianlu.testnet");
    const onboardTeamMember = await near.account("minqi.testnet");

    // For now, minqi.testnet acts as keypom; so functionCalls come from minqi and keypom args will be manually set in function call
    // Since this will bypass voting, simply needs to pass that aspect
    
    // Create DAO, specify minqianlu as council

    // Add two more roles, one "minqi-role" and one "onboardee-role"

    // use minqianlu to approve said proposals to add the roles

    // give "minqi-role" the ability to add proposal to add members

    // use minqianlu to approve said proposal to give 

    // Add minqi to dao as new role "minqi-role", this should not automatically add

    // Use minqianlu to vote approve on this proposal to add minqi
    
    // Check minqi is added dao in that role

    // Use minqi to propose adding a new member, new-moon-dao-member-1.testnet or something, to "onboardee-role"

    // This should auto approve, get status/existence of the proposal and check for 

	
	// Mint 1 NFT for the funder from the NFT contract outlined in the NFT_DATA
	createdDao = await councilMember.functionCall(
		"dev-1681312181173-69377159098922", 
		'new', 
		{
            config: {
                name: 'keypomtestdao',
                purpose: 'to test adding members automatically',
                metadata: '',
            },
            
			policy: {
                roles: [
                    {
                        name: 'council',
                        kind: '{ Group: [minqianlu.testnet] }', // fails with kind: "Everyone" need to investigate
                        permissions: ['*:*'],
                        vote_policy: '{}',
                    },
                    {
                        name: 'minqi-role',
                        kind: '{ Group: [minqi.testnet] }', // fails with kind: "Everyone" need to investigate
                        permissions: ['*:AddProposal'],
                        vote_policy: '{}',
                    },
                    {
                        name: 'onboardee',
                        kind: '{ Group: [] }', // fails with kind: "Everyone" need to investigate
                        permissions: ['*:VoteApprove', `*:VoteReject`],
                        vote_policy: '{}',
                    },
                ],
                default_vote_policy: {
                    weight_kind: 'TokenWeight',
                    quorum: new BN('1').toString(),
                    threshold: '5',
                },
            },
		},
		"300000000000000",
		// Attached deposit of 0.1 $NEAR
		parseNearAmount("0.1")
	);

    console.log(typeof createDao)
    console.log(createdDao)
	
}

daoFn()