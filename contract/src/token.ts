class Token {
    tokenId: number;
    ownerId: string;
    approved_account_ids: Record<string, number>;
    next_approval_id: number;

    name?: string;
    description?: string;
    mediaURI?: string;
    level?: number;

    constructor(
        tokenId: number,
        ownerId: string,
        approved_account_ids: Record<string, number>,
        next_approval_id: number,

        name?: string,
        description?: string,
        mediaURI?: string,
        level?: number,
    ) {
        this.ownerId = ownerId;
        this.tokenId = tokenId;
        this.approved_account_ids = approved_account_ids;
        this.next_approval_id = next_approval_id;

        this.name = name;
        this.description = description;
        this.mediaURI = mediaURI;
        this.level = level;
    }
}

export default Token;