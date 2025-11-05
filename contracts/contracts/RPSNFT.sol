// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RPSNFT {
    uint256 private _tokenIdCounter;
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) public playerWins;
    
    event NFTMinted(address indexed player, uint256 tokenId);
    
    function mintNFT(address player) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _owners[tokenId] = player;
        playerWins[player]++;
        
        emit NFTMinted(player, tokenId);
        return tokenId;
    }
    
    function ownerOf(uint256 tokenId) public view returns (address) {
        return _owners[tokenId];
    }
    
    function getPlayerWins(address player) public view returns (uint256) {
        return playerWins[player];
    }
}
}