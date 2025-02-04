// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IConvexCurveLpStakingWrapperFactory {
    event ImplementationSet(address implementation);
    event ProxyDeployed(address proxy);
    event WrapperDeployed(uint256 indexed pid, address wrapperProxy, address curveLpToken);

    function deploy(uint256 _pid) external returns (address wrapperProxy_);
    function getCurveLpTokenForWrapper(address _wrapper) external view returns (address lpToken_);
    function getOwner() external view returns (address owner_);
    function getWrapperForConvexPool(uint256 _pid) external view returns (address wrapper_);
    function implementation() external view returns (address);
    function pauseWrappers(address[] memory _wrappers) external;
    function setImplementation(address _nextImplementation) external;
    function unpauseWrappers(address[] memory _wrappers) external;
}
