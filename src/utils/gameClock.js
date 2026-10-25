export function stampServerClock(game) {
  if (!game) return game;
  return { ...game, clientReceivedAt: Date.now() };
}

export function getRemainingMs(game, now = Date.now()) {
  if (!game?.startTime && !game?.endTime) return 0;

  const duration = Number(game.duration);
  const endMs = game.endTime
    ? new Date(game.endTime).getTime()
    : new Date(game.startTime).getTime() +
      (Number.isFinite(duration) ? duration : 2) * 60 * 1000;

  if (game.serverNow && game.clientReceivedAt) {
    const serverNowMs = new Date(game.serverNow).getTime();
    return endMs - serverNowMs - (now - game.clientReceivedAt);
  }

  return endMs - now;
}
