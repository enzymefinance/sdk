// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IConvexCurveLpStakingWrapperFactory {
    event CanonicalLibSet(address nextCanonicalLib);
    event ProxyDeployed(address indexed caller, address proxy, bytes constructData);
    event WrapperDeployed(uint256 indexed pid, address wrapperProxy, address curveLpToken);

    function deploy(uint256 _pid) external returns (address wrapperProxy_);
    function deployProxy(bytes memory _constructData) external returns (address proxy_);
    function getCanonicalLib() external view returns (address canonicalLib_);
    function getCurveLpTokenForWrapper(address _wrapper) external view returns (address lpToken_);
    function getOwner() external view returns (address owner_);
    function getWrapperForConvexPool(uint256 _pid) external view returns (address wrapper_);
    function pauseWrappers(address[] memory _wrappers) external;
    function setCanonicalLib(address _nextCanonicalLib) external;
    function unpauseWrappers(address[] memory _wrappers) external;
}
