// Find all our documentation at https://docs.near.org
import {
  NearBindgen,
  near,
  call,
  view,
  LookupMap,
  initialize,
} from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";

import Token from "./token";

// type NFTContractMetadata = {
//   spec: string, // required, essentially a version like "nft-2.0.0", replacing "2.0.0" with the implemented version of NEP-177
//   name: string, // required, ex. "Mochi Rising — Digital Edition" or "Metaverse 3"
//   symbol: string, // required, ex. "MOCHI"
//   icon: string|null, // Data URL
//   base_uri: string|null, // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
//   reference: string|null, // URL to a JSON file with more info
//   reference_hash: string|null, // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
// }

// type TokenMetadata = {
//   title: string|null, // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
//   description: string|null, // free-form description
//   media: string|null, // URL to associated media, preferably to decentralized, content-addressed storage
//   media_hash: string|null, // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
//   copies: number|null, // number of copies of this set of metadata in existence when token was minted.
//   issued_at: number|null, // When token was issued or minted, Unix epoch in milliseconds
//   expires_at: number|null, // When token expires, Unix epoch in milliseconds
//   starts_at: number|null, // When token starts being valid, Unix epoch in milliseconds
//   updated_at: number|null, // When token was last updated, Unix epoch in milliseconds
//   extra: string|null, // anything extra the NFT wants to store on-chain. Can be stringified JSON.
//   reference: string|null, // URL to an off-chain JSON file with more info.
//   reference_hash: string|null // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
// }

@NearBindgen({})
class Contract {
  totalToken: number;
  ownerId: AccountId;
  ownerByToken: LookupMap<string>;
  tokenList: LookupMap<Token>;

  constructor() {
    this.ownerId = "";
    this.totalToken = 0;
    this.ownerByToken = new LookupMap("");
    this.tokenList = new LookupMap(null);
  }

  @initialize({})
  init({ ownerId }: { ownerId: string }) {
    this.ownerId = ownerId;
    this.ownerByToken = new LookupMap("ownerByToken");
    this.tokenList = new LookupMap("tokenList");
  }

  @call({})
  mintNft({
    tokenOwnerId,
    name,
    description,
    mediaURI,
    level,
  }: {
    tokenOwnerId: string;
    name?: string;
    description?: string;
    mediaURI?: string;
    level?: number;
  }): Token {
    let newTokenId = this.totalToken;

    this.ownerByToken.set(newTokenId.toString(), tokenOwnerId);
    let token = new Token(
      newTokenId,
      tokenOwnerId,
      {},
      0,
      name,
      description,
      mediaURI,
      level
    );

    this.tokenList.set(newTokenId.toString(), token);

    this.totalToken++;
    return token;
  }

  @view({})
  getTokenById({ tokenId }: { tokenId: number }): Token {
    return this.tokenList.get(tokenId.toString());
  }

  @view({})
  getTotalSupply(): number {
    return this.totalToken;
  }

  @view({})
  getAllToken(): Token[] {
    console.log('test');

    var allTokens: Token[];

    for (let index = 0; index < this.totalToken; index++) {
      // console.log(this.tokenList.get(index.toString()));
      allTokens.push(this.tokenList.get(index.toString()));
    }

    return allTokens;
  }

  // Approval Management

}
