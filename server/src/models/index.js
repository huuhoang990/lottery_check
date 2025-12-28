const sequelize = require('../config/database');
const User = require('./user');
const LotteryTicket = require('./lottery_ticket');
const LotteryDraw = require('./lottery_draw');
const Prize = require('./prize');

// Relation ship
User.hasMany(LotteryTicket, { foreignKey: 'user_id' });
LotteryTicket.belongsTo(User, { foreignKey: 'user_id' });

LotteryDraw.hasMany(LotteryTicket, { foreignKey: 'draw_date', sourceKey: 'draw_date' });
LotteryTicket.belongsTo(LotteryDraw, { foreignKey: 'draw_date', targetKey: 'draw_date' });

LotteryDraw.hasMany(Prize, { foreignKey: 'draw_id' });
Prize.belongsTo(LotteryDraw, { foreignKey: 'draw_id' });

LotteryTicket.hasOne(Prize, { foreignKey: 'ticket_id' });
Prize.belongsTo(LotteryTicket, { foreignKey: 'ticket_id' });

module.exports = { sequelize, User, LotteryTicket, LotteryDraw, Prize };
