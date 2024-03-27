export const solToLamports = (sol: number) => {
    console.log("solToLamports", sol);
    const lamportsPerSol = 1000000000; // 1 SOL = 1,000,000,000 lamports
    console.log("lamports", sol * lamportsPerSol);
    return sol * lamportsPerSol;
}