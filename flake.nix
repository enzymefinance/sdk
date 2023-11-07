{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
    foundry.url = "github:shazow/foundry.nix";
  };

  outputs = { self, nixpkgs, utils, foundry, ... }:
    utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        overlays = [ foundry.overlay ];
      };

      corepack = pkgs.runCommand "corepack" {} ''
        mkdir -p $out/bin
        ${pkgs.nodejs_20}/bin/corepack enable --install-directory $out/bin
      '';
    in {
      formatter = pkgs.alejandra;

      devShells = {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            corepack
            foundry-bin
          ];
        };
      };
    });
}
