const {
    createLeaf,
    createMerkleTree,
    createProof,
    findIndex,
    createMerkleTreeLevel,
    reduceIndexForNextLevel,
    someMagicalHexValue,
    remLast,
    hash
} = require('./library');

let leaves = [];
let numberOfLeaves = 8;
let seeds = [39, 41, 59, 30, 96, 57, 45, 41];
let expectedMagicHexValueOfSeeds_0 = "4e00";

test("<<<<<<<<<<<<<<<<<<   someMagicalHexValue function test   >>>>>>>>>>>>>>>>>>>>>>", () => {
    console.log("seeds[0]: ", seeds[0]);
    console.log("someMagicalHexValue(seeds[0]): ", someMagicalHexValue(seeds[0]));

    expect(expectedMagicHexValueOfSeeds_0).toBe(someMagicalHexValue(seeds[0]));
})

let expectedPrintOfResultLeaves = [
    'Account39-4e00:3900',
    'Account41-a400:4100',
    'Account59-ec000:5900',
    'Account30-f00:3000',
    'Account96-60000000:9600',
    'Account57-e4000:5700',
    'Account45-16800:4500',
    'Account41-a400:4100'
];

test("<<<<<<<<<<<<<<<<<<   createLeaf function test   >>>>>>>>>>>>>>>>>>>>>>", () => {
    console.log("number of leaves: ", numberOfLeaves);
    console.log("seeds: ", seeds);
    console.log("expectedPrintOfResultLeaves: ", expectedPrintOfResultLeaves);

    for (let leavesCreated = 0; leavesCreated < numberOfLeaves; leavesCreated++) {
        leaves.push(createLeaf(seeds[leavesCreated]));
        expect(leaves[leavesCreated].print()).toBe(expectedPrintOfResultLeaves[leavesCreated]);
    }
})

// leaves = leaves.map(leaf => hash(leaf.print()));
let expectedTreeNodesOfLevel1 = [
    "16a16893dbf9cf5b2370a4328d1cc9e7abf30ccc828718fba736060aab3bd86e",
    "93740975d9ad71160bbdbbb831b7c3f2d5ed0863b14a3b27e3d2e191daf9e161",
    "39425bccfb1ae3ac71f50519ad9154a4602c93b3728a0ac87b9cb1a347e1ed6d",
    "a8bf03487ed788502bba40dec86f6e449b0bc9ec3ba667f1640144331694d846"
];

test("<<<<<<<<<<<<<<<<<<   createMerkleTreeLevel function test   >>>>>>>>>>>>>>>>>>>>>>", () => {
    leaves = leaves.map(leaf => hash(leaf.print()));
    console.log("expectedTreeNodesOfLevel1: ", expectedTreeNodesOfLevel1);
    expect(createMerkleTreeLevel(leaves)).toStrictEqual(expectedTreeNodesOfLevel1);
})

let expectedMerkleTree = {
    nodes: [
        [
            '515088f4dfa62ab0151eda0299960a21f32ee94046cb6c340b72744dd2d74380',
            '49b4cf70dfd41b9195102798f44eaef500d53ed9b360b681a99d56bf3bd4dbbf',
            '38f17738132036bceaa0520876e66d107bc0940f1e0cd2de2dc1d8005d7ff11d',
            '3f6c86a280edc5e5f63bba96f947b5655d51219baed2bd28999b2429a4cf2997',
            '1bf0be3c1ce2a92c5323f1ae74a808c193a58f92fcb47d4a5b70c35ba145b0e4',
            '9fb3c3d6ceb552e6ed3cfde9dafe1c39e9752d3b800427274ea46621b8e02af8',
            'fad028a43482bbc8989752a64a7a703719046e606f70c9fa6af0e0ee0e5364d9',
            '49b4cf70dfd41b9195102798f44eaef500d53ed9b360b681a99d56bf3bd4dbbf'
        ],
        [
            '16a16893dbf9cf5b2370a4328d1cc9e7abf30ccc828718fba736060aab3bd86e',
            '93740975d9ad71160bbdbbb831b7c3f2d5ed0863b14a3b27e3d2e191daf9e161',
            '39425bccfb1ae3ac71f50519ad9154a4602c93b3728a0ac87b9cb1a347e1ed6d',
            'a8bf03487ed788502bba40dec86f6e449b0bc9ec3ba667f1640144331694d846'
        ],
        [
            '7c6ac9554abd6c0df32017a23bee6e72a6537bd9d0f2d7f84544ca0bb3d05708',
            'e62ca10987d28be81975b42de5d7ec9e26497ff425d380321123e7d0bf7c8694'
        ],
        [
            'c96f79c1c3caa3a1876e84565162792f0b341373e5c3b7322bc374316d425843'
        ]
    ],
    root: 'c96f79c1c3caa3a1876e84565162792f0b341373e5c3b7322bc374316d425843'
};

let tree;

test("<<<<<<<<<<<<<<<<<<   createMerkleTree function test   >>>>>>>>>>>>>>>>>>>>>>", () => {
    tree = createMerkleTree(leaves);
    console.log("expected root of tree: ", expectedMerkleTree.root);
    expect(tree.root).toBe(expectedMerkleTree.root);
})

let expectedTreeWithoutRoot = [
    [
        '515088f4dfa62ab0151eda0299960a21f32ee94046cb6c340b72744dd2d74380',
        '49b4cf70dfd41b9195102798f44eaef500d53ed9b360b681a99d56bf3bd4dbbf',
        '38f17738132036bceaa0520876e66d107bc0940f1e0cd2de2dc1d8005d7ff11d',
        '3f6c86a280edc5e5f63bba96f947b5655d51219baed2bd28999b2429a4cf2997',
        '1bf0be3c1ce2a92c5323f1ae74a808c193a58f92fcb47d4a5b70c35ba145b0e4',
        '9fb3c3d6ceb552e6ed3cfde9dafe1c39e9752d3b800427274ea46621b8e02af8',
        'fad028a43482bbc8989752a64a7a703719046e606f70c9fa6af0e0ee0e5364d9',
        '49b4cf70dfd41b9195102798f44eaef500d53ed9b360b681a99d56bf3bd4dbbf'
    ],
    [
        '16a16893dbf9cf5b2370a4328d1cc9e7abf30ccc828718fba736060aab3bd86e',
        '93740975d9ad71160bbdbbb831b7c3f2d5ed0863b14a3b27e3d2e191daf9e161',
        '39425bccfb1ae3ac71f50519ad9154a4602c93b3728a0ac87b9cb1a347e1ed6d',
        'a8bf03487ed788502bba40dec86f6e449b0bc9ec3ba667f1640144331694d846'
    ],
    [
        '7c6ac9554abd6c0df32017a23bee6e72a6537bd9d0f2d7f84544ca0bb3d05708',
        'e62ca10987d28be81975b42de5d7ec9e26497ff425d380321123e7d0bf7c8694'
    ]
];

test("<<<<<<<<<<<<<<<<<<   remLast function test   >>>>>>>>>>>>>>>>>>>>>>", () => {
    let treeWithoutRoot = remLast(tree.nodes);
    console.log("expected tree without root: ", expectedTreeWithoutRoot);
    expect(treeWithoutRoot).toStrictEqual(expectedTreeWithoutRoot);
})

// random index of level 0 of tree
let rv = 4;
let pairIndex;

test("<<<<<<<<<<<<<<<<<<   findIndex function test   >>>>>>>>>>>>>>>>>>>>>>", () => {
    pairIndex = findIndex(rv);
    expect(pairIndex).toBe(5);
})

test("<<<<<<<<<<<<<<<<<<   reduceIndexForNextLevel function test   >>>>>>>>>>>>>>>>>>>>>>", () => {
    console.log(`reduceIndexForNextLevel(${pairIndex})  :  ${reduceIndexForNextLevel(pairIndex)}`);
    expect(reduceIndexForNextLevel(pairIndex)).toBe(2);
})

let expectedMerklePath = [
    '9fb3c3d6ceb552e6ed3cfde9dafe1c39e9752d3b800427274ea46621b8e02af8',
    'a8bf03487ed788502bba40dec86f6e449b0bc9ec3ba667f1640144331694d846',
    '7c6ac9554abd6c0df32017a23bee6e72a6537bd9d0f2d7f84544ca0bb3d05708'
];

test("<<<<<<<<<<<<<<<<<<   createProof function test   >>>>>>>>>>>>>>>>>>>>>>", () => {
    let merklePath = createProof(tree, rv);
    console.log("expected merkle path: ", expectedMerklePath);
    expect(merklePath).toStrictEqual(expectedMerklePath);
})