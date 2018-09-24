pragma solidity ^0.4.24;

contract Election {
    //MARK: State variables
    string public candidate;

    //MARK: Constructor
    constructor () public {
        candidate = "Yoshua E";
    }
}