// ==============================
// 角色配置
// ==============================
const ROLE_LIST = [
  { 
    id: 'warrior', name: '狂战士', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=warrior', 
    maxHp: 8, maxEnergy: 3,
    skills: [
      { name: '猛击', description: '造成1.5点伤害，回1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 1.5 }; } },
      { name: '旋风斩', description: '对所有敌人造成1点伤害，回2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (t, c) => { return { damage: 1 }; } },
      { name: '狂暴', description: '造成3点伤害，获得「攻击强化」持续2回合', cooldown: 0, energyCost: 3, targetType: 'enemy', isUltimate: true,
        effect: (t, c) => { return { damage: 3, buff: BUFF_LIST.attackUp }; } }
    ] 
  },
  { 
    id: 'mage', name: '大法师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=mage', 
    maxHp: 5, maxEnergy: 4,
    skills: [
      { name: '火球术', description: '造成2点伤害，回1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 2 }; } },
      { name: '冰霜新星', description: '对所有敌人造成1点伤害，附加「眩晕」（闪避一次）', cooldown: 3, energyGain: 2, targetType: 'allEnemy',
        effect: (t, c) => { return { damage: 1, buff: BUFF_LIST.dodge }; } },
      { name: '末日审判', description: '对所有敌人造成4点伤害', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (t, c) => { return { damage: 4 }; } }
    ] 
  },
  { 
    id: 'healer', name: '神圣牧师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=healer', 
    maxHp: 6, maxEnergy: 3,
    skills: [
      { name: '圣光术', description: '为友方恢复1.5点血量，回1点充能', cooldown: 0, energyGain: 1, targetType: 'ally',
        effect: (t, c) => { return { damage: -1.5 }; } },
      { name: '群体治疗', description: '为所有友方恢复1点血量，回2点充能', cooldown: 3, energyGain: 2, targetType: 'allAlly',
        effect: (t, c) => { return { damage: -1 }; } },
      { name: '神圣庇护', description: '为所有友方附加「伤害减免」持续2回合', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (t, c) => { return { buff: BUFF_LIST.damageReduction }; } }
    ] 
  },
  { 
    id: 'tank', name: '钢铁守卫', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=tank', 
    maxHp: 12, maxEnergy: 4,
    skills: [
      { name: '盾击', description: '造成1点伤害，获得1点护盾，回1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { c.shield += 1; return { damage: 1 }; } },
      { name: '坚守阵地', description: '获得3点护盾，附加「嘲讽」持续2回合', cooldown: 2, energyGain: 2, targetType: 'self',
        effect: (t, c) => { c.shield += 3; return { buff: BUFF_LIST.taunt }; } },
      { name: '不灭之躯', description: '为自己附加「回光返照」', cooldown: 0, energyCost: 4, targetType: 'self', isUltimate: true,
        effect: (t, c) => { return { buff: BUFF_LIST.lastStand }; } }
    ] 
  },
  { 
    id: 'archer', name: '精灵射手', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=archer', 
    maxHp: 6, maxEnergy: 2,
    skills: [
      { name: '精准射击', description: '造成2点伤害，回1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 2 }; } },
      { name: '多重射击', description: '对随机2名敌人造成1.5点伤害', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (t, c) => { return { damage: 1.5 }; } },
      { name: '致命一击', description: '造成5点伤害，附加「致命标记」', cooldown: 0, energyCost: 2, targetType: 'enemy', isUltimate: true,
        effect: (t, c) => { return { damage: 5, buff: BUFF_LIST.mark }; } }
    ] 
  },
  { 
    id: 'assassin', name: '暗影刺客', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=assassin', 
    maxHp: 5, maxEnergy: 2,
    skills: [
      { name: '暗袭', description: '造成1.8点伤害，回1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 1.8 }; } },
      { name: '潜行', description: '为自己附加「隐身」持续2回合', cooldown: 2, energyGain: 2, targetType: 'self',
        effect: (t, c) => { return { buff: BUFF_LIST.invisibility }; } },
      { name: '背刺', description: '造成6点伤害，忽略护盾', cooldown: 0, energyCost: 2, targetType: 'enemy', isUltimate: true,
        effect: (t, c) => { t.shield = 0; return { damage: 6 }; } }
    ] 
  },
  { 
    id: 'paladin', name: '圣光骑士', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=paladin', 
    maxHp: 9, maxEnergy: 3,
    skills: [
      { name: '圣盾斩', description: '造成1.2点伤害，为自己获得1点护盾', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { c.shield += 1; return { damage: 1.2 }; } },
      { name: '神圣祝福', description: '为一名友方附加「攻击强化」和「伤害减免」', cooldown: 3, energyGain: 2, targetType: 'ally',
        effect: (t, c) => { return { buff: [BUFF_LIST.attackUp, BUFF_LIST.damageReduction] }; } },
      { name: '神圣清算', description: '造成2.5点伤害，恢复等同于伤害的血量', cooldown: 0, energyCost: 3, targetType: 'enemy', isUltimate: true,
        effect: (t, c) => { const dmg = 2.5; c.currentHp = Math.min(c.maxHp, c.currentHp + dmg); return { damage: dmg }; } }
    ] 
  },
  { 
    id: 'necromancer', name: '死灵法师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=necromancer', 
    maxHp: 6, maxEnergy: 4,
    skills: [
      { name: '亡灵之触', description: '造成1.5点伤害，附加「流血」', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 1.5, buff: BUFF_LIST.bleed }; } },
      { name: '瘟疫爆发', description: '对所有敌人附加「剧毒」', cooldown: 3, energyGain: 2, targetType: 'allEnemy',
        effect: (t, c) => { return { buff: BUFF_LIST.poison }; } },
      { name: '亡灵大军', description: '对所有敌人造成3点伤害，为自己恢复2点血量', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (t, c) => { c.currentHp = Math.min(c.maxHp, c.currentHp + 2); return { damage: 3 }; } }
    ] 
  },
  { 
    id: 'alchemist', name: '炼金术师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=alchemist', 
    maxHp: 7, maxEnergy: 3,
    skills: [
      { name: '强酸瓶', description: '造成2点伤害，附加「灼烧」', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 2, buff: BUFF_LIST.burn }; } },
      { name: '生命药剂', description: '为一名友方恢复3点血量', cooldown: 2, energyGain: 2, targetType: 'ally',
        effect: (t, c) => { return { damage: -3 }; } },
      { name: '不稳定化合物', description: '随机效果：对所有敌人造成3-5伤害，或对所有友方恢复2-3血量', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (t, c) => {
          if (Math.random() > 0.5) {
            return { damage: 3 + Math.floor(Math.random() * 3) };
          } else {
            gameState.players[gameState.currentOperatePlayer].battleRoles.forEach(r => {
              if (r.currentHp > 0) r.currentHp = Math.min(r.maxHp, r.currentHp + 2 + Math.floor(Math.random() * 2));
            });
            return { damage: 0 };
          }
        } }
    ] 
  },
  { 
    id: 'bard', name: '吟游诗人', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=bard', 
    maxHp: 6, maxEnergy: 3,
    skills: [
      { name: '鼓舞之歌', description: '为一名友方回1点充能，回1点自己的充能', cooldown: 0, energyGain: 1, targetType: 'ally',
        effect: (t, c) => { t.currentEnergy = Math.min(t.maxEnergy, (t.currentEnergy || 0) + 1); return { damage: 0 }; } },
      { name: '催眠曲', description: '为一名敌人附加「混乱」', cooldown: 3, energyGain: 2, targetType: 'enemy',
        effect: (t, c) => { return { buff: BUFF_LIST.confusion }; } },
      { name: '英雄赞歌', description: '为所有友方附加「攻击强化」、「暴击增幅」', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (t, c) => { return { buff: [BUFF_LIST.attackUp, BUFF_LIST.critBoost] }; } }
    ] 
  },
  { 
    id: 'barbarian', name: '荒野野蛮人', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=barbarian', 
    maxHp: 10, maxEnergy: 3,
    skills: [
      { name: '野蛮冲撞', description: '造成2点伤害，有50%概率附加「眩晕」（持续1回合）', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { const buff = Math.random() > 0.5 ? {...BUFF_LIST.dodge, name:'眩晕', duration:1} : null; return { damage: 2, buff }; } },
      { name: '嗜血', description: '造成1.5点伤害，恢复等同于伤害的血量', cooldown: 2, energyGain: 2, targetType: 'enemy',
        effect: (t, c) => { const dmg = 1.5; c.currentHp = Math.min(c.maxHp, c.currentHp + dmg); return { damage: dmg }; } },
      { name: '狂暴杀戮', description: '造成5点伤害，获得「吸血增强」持续2回合', cooldown: 0, energyCost: 3, targetType: 'enemy', isUltimate: true,
        effect: (t, c) => { return { damage: 5, buff: BUFF_LIST.lifestealBoost }; } }
    ] 
  },
  { 
    id: 'elementalist', name: '元素师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=elementalist', 
    maxHp: 5, maxEnergy: 4,
    skills: [
      { name: '元素箭', description: '造成1.8点伤害，随机附加「流血」/「灼烧」/「剧毒」', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => {
          const debuffs = [BUFF_LIST.bleed, BUFF_LIST.burn, BUFF_LIST.poison];
          return { damage: 1.8, buff: debuffs[Math.floor(Math.random() * debuffs.length)] };
        } },
      { name: '元素风暴', description: '对所有敌人造成1.2点伤害，随机附加1种Debuff', cooldown: 3, energyGain: 2, targetType: 'allEnemy',
        effect: (t, c) => {
          const debuffs = [BUFF_LIST.bleed, BUFF_LIST.burn, BUFF_LIST.poison, BUFF_LIST.attackDown];
          return { damage: 1.2, buff: debuffs[Math.floor(Math.random() * debuffs.length)] };
        } },
      { name: '元素共鸣', description: '对所有敌人造成3.5点伤害，附加所有3种持续伤害Debuff', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (t, c) => { return { damage: 3.5, buff: [BUFF_LIST.bleed, BUFF_LIST.burn, BUFF_LIST.poison] }; } }
    ] 
  },
  { 
    id: 'monk', name: '武僧', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=monk', 
    maxHp: 7, maxEnergy: 2,
    skills: [
      { name: '寸拳', description: '造成1.8点伤害，回1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 1.8 }; } },
      { name: '铁布衫', description: '为自己附加「伤害减免」和「反伤」', cooldown: 2, energyGain: 2, targetType: 'self',
        effect: (t, c) => { return { buff: [BUFF_LIST.damageReduction, BUFF_LIST.reflect] }; } },
      { name: '如来神掌', description: '造成4.5点伤害，附加「眩晕」（持续1回合）', cooldown: 0, energyCost: 2, targetType: 'enemy', isUltimate: true,
        effect: (t, c) => { return { damage: 4.5, buff: {...BUFF_LIST.dodge, name:'眩晕', duration:1} }; } }
    ] 
  },
  { 
    id: 'shadowArcher', name: '暗影弓手', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=shadowArcher', 
    maxHp: 5, maxEnergy: 3,
    skills: [
      { name: '暗影箭', description: '造成1.5点伤害，附加「致命标记」', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 1.5, buff: BUFF_LIST.mark }; } },
      { name: '黑暗迷雾', description: '为所有友方附加「隐身」持续1回合', cooldown: 3, energyGain: 2, targetType: 'allAlly',
        effect: (t, c) => { return { buff: {...BUFF_LIST.invisibility, duration:1} }; } },
      { name: '暗无天日', description: '对所有敌人造成2.5点伤害，有标记的额外再造成2.5点', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (t, c) => {
          let dmg = 2.5;
          if (t.buffs.some(b => b.id === 'mark')) {
            dmg += 2.5;
            t.buffs = t.buffs.filter(b => b.id !== 'mark');
          }
          return { damage: dmg };
        } }
    ] 
  },
  { 
    id: 'druid', name: '森林德鲁伊', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=druid', 
    maxHp: 8, maxEnergy: 3,
    skills: [
      { name: '荆棘缠绕', description: '造成1.2点伤害，附加「攻击弱化」', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 1.2, buff: BUFF_LIST.attackDown }; } },
      { name: '自然治愈', description: '为一名友方恢复2点血量，清除所有Debuff', cooldown: 2, energyGain: 2, targetType: 'ally',
        effect: (t, c) => { t.buffs = t.buffs.filter(b => b.type === 'buff'); return { damage: -2, buff: BUFF_LIST.cleanse }; } },
      { name: '森林之怒', description: '对所有敌人造成2点伤害，为所有友方恢复1点血量', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (t, c) => {
          gameState.players[gameState.currentOperatePlayer].battleRoles.forEach(r => {
            if (r.currentHp > 0) r.currentHp = Math.min(r.maxHp, r.currentHp + 1);
          });
          return { damage: 2 };
        } }
    ] 
  },
  { 
    id: 'pirate', name: '加勒比海盗', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=pirate', 
    maxHp: 7, maxEnergy: 3,
    skills: [
      { name: '弯刀斩', description: '造成1.7点伤害，回1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 1.7 }; } },
      { name: '海盗钩', description: '造成1.5点伤害，偷取目标1点充能', cooldown: 2, energyGain: 2, targetType: 'enemy',
        effect: (t, c) => {
          const stolen = Math.min(t.currentEnergy || 0, 1);
          t.currentEnergy = Math.max(0, (t.currentEnergy || 0) - stolen);
          c.currentEnergy = Math.min(c.maxEnergy, (c.currentEnergy || 0) + stolen);
          return { damage: 1.5 };
        } },
      { name: '宝藏诅咒', description: '造成3点伤害，附加「混乱」和「攻击弱化」', cooldown: 0, energyCost: 3, targetType: 'enemy', isUltimate: true,
        effect: (t, c) => { return { damage: 3, buff: [BUFF_LIST.confusion, BUFF_LIST.attackDown] }; } }
    ] 
  },
  { 
    id: 'samurai', name: '武士', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=samurai', 
    maxHp: 7, maxEnergy: 3,
    skills: [
      { name: '居合斩', description: '造成2点伤害，回1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (t, c) => { return { damage: 2 }; } },
      { name: '一闪', description: '造成2.5点伤害，附加「致命标记」', cooldown: 2, energyGain: 2, targetType: 'enemy',
        effect: (t, c) => { return { damage: 2.5, buff: BUFF_LIST.mark }; } },
      { name: '剑豪之怒', description: '造成6点伤害，有标记的额外再造成3点，清除标记', cooldown: 0, energyCost: 3, targetType: 'enemy', isUltimate: true,
        effect: (t, c) => {
          let dmg = 6;
          if (t.buffs.some(b => b.id === 'mark')) {
            dmg += 3;
            t.buffs = t.buffs.filter(b => b.id !== 'mark');
          }
          return { damage: dmg };
        } }
    ] 
  }
];

// 游戏规则配置
const GAME_CONFIG = {
  MAX_ROUND: 20,
  ROLES_PER_PLAYER: 3
};
