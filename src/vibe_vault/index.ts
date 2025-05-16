import * as borsh from '@coral-xyz/borsh';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

// Program ID from the IDL
const PROGRAM_ID = new PublicKey('AsRo4gj9W5MW39xRmsToGkjMKesfwujQg97H7KuyVCcM');

// Discriminator for the stake instruction from the IDL
const STAKE_DISCRIMINATOR = Buffer.from([206, 176, 202, 18, 200, 209, 179, 108]);

// Define the schema for the stake instruction arguments
const stakeInstructionSchema = borsh.struct([
    borsh.u64('receive'),
]);

const UNSTAKE_DISCRIMINATOR = Buffer.from([90, 95, 107, 42, 205, 124, 50, 225]);

// Define the schema for the unstake instruction arguments
const unstakeInstructionSchema = borsh.struct([
    borsh.u64('withdraw'),
]);

/**
 * Creates a stake instruction for the vibe_vault program.
 * @param user The public key of the user staking tokens
 * @param mint The public key of the token mint
 * @param userAta The associated token account of the user
 * @param vaultState The PDA for the vault state
 * @param vault The PDA for the vault token account
 * @param userState The PDA for the user state
 * @param receive The amount of tokens to stake
 * @returns The transaction instruction for staking
 */
export function createStakeInstruction(
    user: PublicKey,
    mint: PublicKey,
    userAta: PublicKey,
    receive: BN
): web3.TransactionInstruction {
    // Compute vaultState PDA: seeds = ["vault", mint]
    const vaultSeed = Buffer.from('vault');
    const [vaultState] = PublicKey.findProgramAddressSync(
        [vaultSeed, mint.toBuffer()],
        PROGRAM_ID
    );

    // Compute userState PDA: seeds = ["user_vault", user]
    const userVaultSeed = Buffer.from('user_vault');
    const [userState] = PublicKey.findProgramAddressSync(
        [userVaultSeed, user.toBuffer()],
        PROGRAM_ID
    );

    // Compute vault PDA: seeds = [vaultState, token_program, mint]
    const [vault] = PublicKey.findProgramAddressSync(
        [vaultState.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
        ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // Serialize the receive argument
    const argsBuffer = Buffer.alloc(stakeInstructionSchema.getSpan());
    stakeInstructionSchema.encode({ receive }, argsBuffer);

    // Combine discriminator and serialized arguments
    const data = Buffer.concat([STAKE_DISCRIMINATOR, argsBuffer]);

    // Define the account metas
    const keys = [
        { pubkey: user, isSigner: true, isWritable: true },
        { pubkey: mint, isSigner: false, isWritable: false },
        { pubkey: userAta, isSigner: false, isWritable: true },
        { pubkey: vaultState, isSigner: false, isWritable: true },
        { pubkey: vault, isSigner: false, isWritable: true },
        { pubkey: userState, isSigner: false, isWritable: true },
        { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: web3.SystemProgram.programId, isSigner: false, isWritable: false },
    ];

    // Create and return the transaction instruction
    return new web3.TransactionInstruction({
        keys,
        programId: PROGRAM_ID,
        data,
    });
}

export function createUnstakeInstruction(
    user: PublicKey,
    mint: PublicKey,
    userAta: PublicKey,
    withdraw: BN
): web3.TransactionInstruction {
    // Compute vaultState PDA: seeds = ["vault", mint]
    const vaultSeed = Buffer.from('vault');
    const [vaultState] = PublicKey.findProgramAddressSync(
        [vaultSeed, mint.toBuffer()],
        PROGRAM_ID
    );

    // Compute userState PDA: seeds = ["user_vault", user]
    const userVaultSeed = Buffer.from('user_vault');
    const [userState] = PublicKey.findProgramAddressSync(
        [userVaultSeed, user.toBuffer()],
        PROGRAM_ID
    );

    // Compute vault PDA: seeds = [vaultState, token_program, mint]
    const [vault] = PublicKey.findProgramAddressSync(
        [vaultState.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
        ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // Serialize the withdraw argument
    const argsBuffer = Buffer.alloc(unstakeInstructionSchema.getSpan());
    unstakeInstructionSchema.encode({ withdraw }, argsBuffer);

    // Combine discriminator and serialized arguments
    const data = Buffer.concat([UNSTAKE_DISCRIMINATOR, argsBuffer]);

    // Define the account metas
    const keys = [
        { pubkey: user, isSigner: true, isWritable: true },
        { pubkey: mint, isSigner: false, isWritable: false },
        { pubkey: userAta, isSigner: false, isWritable: true },
        { pubkey: vaultState, isSigner: false, isWritable: true },
        { pubkey: vault, isSigner: false, isWritable: true },
        { pubkey: userState, isSigner: false, isWritable: true },
        { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: web3.SystemProgram.programId, isSigner: false, isWritable: false },
    ];

    // Create and return the transaction instruction
    return new web3.TransactionInstruction({
        keys,
        programId: PROGRAM_ID,
        data,
    });
}