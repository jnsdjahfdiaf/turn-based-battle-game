import { BUFF_LIST } from './buffConfig.js';// 游戏全局配置
// ==============================
// 🎭 全角色配置表，所有技能标准化：
// 一技能固定回能1点，二技能固定回能2点，所有技能添加编号前缀
// 所有伤害/治疗统一为0.5倍数
// ==============================
export const ROLE_LIST = [
  // ========== 原有17个角色 ==========
  { 
    id: 'warrior', name: '狂战士', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=warrior', 
    maxHp: 8.0, maxEnergy: 3,
    skills: [
      { name: '一技能·猛击', description: '对敌方单体造成1.5点伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      { name: '二技能·旋风斩', description: '对所有敌方造成1.0点伤害，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage: 1.0 }; } },
      { name: '三技能·狂暴', description: '对敌方单体造成3.0点伤害，获得「攻击强化」持续2回合', cooldown: 0, energyCost: 3, targetType: 'enemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 3.0, buff: BUFF_LIST.attackUp }; } }
    ] 
  },
  { 
    id: 'mage', name: '大法师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=mage', 
    maxHp: 5.0, maxEnergy: 4,
    skills: [
      { name: '一技能·火球术', description: '对敌方单体造成2.0点伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.0 }; } },
      { name: '二技能·冰霜新星', description: '对所有敌方造成1.0点伤害，附加「眩晕」（闪避一次），冷却3回合', cooldown: 3, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage: 1.0, buff: {...BUFF_LIST.dodge, name:'眩晕', duration:1} }; } },
      { name: '三技能·末日审判', description: '对所有敌方造成4.0点伤害', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 4.0 }; } }
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
            caster?.battleRoles?.forEach(r => {
              if (r && r.currentHp > 0) r.currentHp = Math.min(r.maxHp, r.currentHp + 2 + Math.floor(Math.random() * 2));
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
          if (t.buffs && t.buffs.some(b => b.id === 'mark')) {
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
        effect: (t, c) => { if(t.buffs) t.buffs = t.buffs.filter(b => b.type === 'buff'); return { damage: -2, buff: BUFF_LIST.cleanse }; } },
      { name: '森林之怒', description: '对所有敌人造成2点伤害，为所有友方恢复1点血量', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (t, c) => {
          c?.battleRoles?.forEach(r => {
            if (r && r.currentHp > 0) r.currentHp = Math.min(r.maxHp, r.currentHp + 1);
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
          if (t.buffs && t.buffs.some(b => b.id === 'mark')) {
            dmg += 3;
            t.buffs = t.buffs.filter(b => b.id !== 'mark');
          }
          return { damage: dmg };
        } }
    ] 
  },
  // ========== 新增12个全新角色 ==========
  { 
    id: 'swordsman', name: '剑仙', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=swordsman', 
    maxHp: 7.0, maxEnergy: 3,
    skills: [
      { name: '一技能·斩击', description: '对敌方单体造成2.0点伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.0 }; } },
      { name: '二技能·万剑诀', description: '对所有敌方造成1.5点伤害，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      { name: '三技能·剑神降临', description: '对敌方单体造成5.0点伤害，获得「暴击增幅」持续1回合', cooldown: 0, energyCost: 3, targetType: 'enemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 5.0, buff: BUFF_LIST.critBoost }; } }
    ] 
  },
  { 
    id: 'apothecary', name: '魔药师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=apothecary', 
    maxHp: 6.0, maxEnergy: 3,
    skills: [
      { name: '一技能·治疗药剂', description: '为一名友方恢复2.0点血量，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'ally',
        effect: (target, caster) => { return { damage: -2.0 }; } },
      { name: '二技能·毒液药剂', description: '对敌方单体造成1.5点伤害，附加「剧毒」，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 1.5, buff: BUFF_LIST.poison }; } },
      { name: '三技能·群体治愈', description: '为所有友方恢复2.0点血量，清除所有Debuff', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (target, caster) => { 
          caster?.battleRoles?.forEach(role => {
            if (role && role.currentHp > 0) role.currentHp = Math.min(role.maxHp, role.currentHp + 2.0);
            if(role && role.buffs) role.buffs = role.buffs.filter(b => b.type === 'buff');
          });
          return { damage: 0, buff: BUFF_LIST.cleanse };
        } }
    ] 
  },
  { 
    id: 'darkCaster', name: '暗黑咒术师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=darkCaster', 
    maxHp: 5.5, maxEnergy: 4,
    skills: [
      { name: '一技能·暗蚀', description: '对敌方单体造成2.5点暗属性伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.5 }; } },
      { name: '二技能·诅咒之雾', description: '对所有敌方附加「攻击弱化」和「沉默」，持续2回合', cooldown: 3, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { buff: [BUFF_LIST.attackDown, BUFF_LIST.silence] }; } },
      { name: '三技能·暗影风暴', description: '对所有敌方造成3.5点暗属性伤害，附加「沉默」持续2回合', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 3.5, buff: BUFF_LIST.silence }; } }
    ] 
  },
  { 
    id: 'beastTamer', name: '驯兽师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=beastTamer', 
    maxHp: 8.0, maxEnergy: 3,
    skills: [
      { name: '一技能·鞭挞', description: '对敌方单体造成1.5点伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      { name: '二技能·野性鼓舞', description: '为一名友方附加「攻击强化」和1.5点护盾，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'ally',
        effect: (target, caster) => { if(target) target.shield +=1.5; return { buff: BUFF_LIST.attackUp }; } },
      { name: '三技能·兽群降临', description: '为所有友方附加「攻击强化」，并提供2.0点护盾', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (target, caster) => { 
          caster?.battleRoles?.forEach(role => {
            if (role && role.currentHp > 0) {
              role.shield +=2.0;
              role.buffs.push({...BUFF_LIST.attackUp, duration:2});
            }
          });
          return { damage:0 };
        } }
    ] 
  },
  { 
    id: 'navalCaptain', name: '海军上尉', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=navalCaptain', 
    maxHp: 9.0, maxEnergy: 3,
    skills: [
      { name: '一技能·炮击', description: '对敌方单体造成2.0点炮击伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.0 }; } },
      { name: '二技能·齐射', description: '对所有敌方造成1.5点炮击伤害，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      { name: '三技能·破甲炮击', description: '对所有敌方造成3.0点炮击伤害，附加「破甲」持续2回合', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 3.0, buff: {...BUFF_LIST.damageReduction, name:'破甲', effect:(t)=>{if(t) t.damageTakenMultiplier *=1.5}, duration:2} }; } }
    ] 
  },
  { 
    id: 'shadowNinja', name: '暗影忍者', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=shadowNinja', 
    maxHp: 5.0, maxEnergy: 2,
    skills: [
      { name: '一技能·忍术·突刺', description: '对敌方单体造成2.5点伤害，回复1点充能，50%概率附加闪避', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { 
          const buff = Math.random() > 0.5 ? {...BUFF_LIST.dodge, name:'闪避', duration:1} : null;
          return { damage: 2.5, buff };
        } },
      { name: '二技能·忍术·影分身', description: '为自身附加「闪避」持续2回合，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'self',
        effect: (target, caster) => { return { buff: {...BUFF_LIST.dodge, duration:2} }; } },
      { name: '三技能·忍术·必杀', description: '对敌方单体造成6.0点伤害，附加「致命标记」', cooldown: 0, energyCost: 2, targetType: 'enemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 6.0, buff: BUFF_LIST.mark }; } }
    ] 
  },
  { 
    id: 'forestGuardian', name: '丛林守护者', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=forestGuardian', 
    maxHp: 8.5, maxEnergy: 3,
    skills: [
      { name: '一技能·生命之触', description: '为一名友方恢复1.5点血量，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'ally',
        effect: (target, caster) => { return { damage: -1.5 }; } },
      { name: '二技能·自然屏障', description: '为所有友方附加「伤害减免」持续2回合，回复2点充能', cooldown: 3, energyGain: 2, targetType: 'allAlly',
        effect: (target, caster) => { return { buff: BUFF_LIST.damageReduction }; } },
      { name: '三技能·森林恩赐', description: '为所有友方恢复2.0点血量，附加「伤害减免」持续2回合', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (target, caster) => { 
          caster?.battleRoles?.forEach(role => {
            if (role && role.currentHp > 0) {
              role.currentHp = Math.min(role.maxHp, role.currentHp + 2.0);
              role.buffs.push({...BUFF_LIST.damageReduction, duration:2});
            }
          });
          return { damage:0 };
        } }
    ] 
  },
  { 
    id: 'frostMage', name: '冰霜法师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=frostMage', 
    maxHp: 5.0, maxEnergy: 4,
    skills: [
      { name: '一技能·冰箭', description: '对敌方单体造成2.0点冰属性伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.0 }; } },
      { name: '二技能·霜冻', description: '对敌方单体附加「眩晕」（闪避一次），回复2点充能', cooldown: 2, energyGain: 2, targetType: 'enemy',
        effect: (target, caster) => { return { buff: {...BUFF_LIST.dodge, name:'眩晕', duration:1} }; } },
      { name: '三技能·暴风雪', description: '对所有敌方造成3.5点冰属性伤害，附加「眩晕」持续1回合', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 3.5, buff: {...BUFF_LIST.dodge, name:'眩晕', duration:1} }; } }
    ] 
  },
  { 
    id: 'shadowPriest', name: '暗影牧师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=shadowPriest', 
    maxHp: 6.5, maxEnergy: 3,
    skills: [
      { name: '一技能·暗影箭', description: '对敌方单体造成1.5点暗属性伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      { name: '二技能·生命虹吸', description: '为一名友方恢复2.0点血量，偷取目标0.5点充能，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'ally',
        effect: (target, caster) => { 
          if(caster) caster.currentEnergy = Math.min(caster.maxEnergy, (caster.currentEnergy ||0)+0.5);
          return { damage: -2.0 };
        } },
      { name: '三技能·暗影潮汐', description: '对所有敌方造成2.5点暗属性伤害，为所有友方恢复1.5点血量', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { 
          caster?.battleRoles?.forEach(role => {
            if (role && role.currentHp >0) role.currentHp = Math.min(role.maxHp, role.currentHp +1.5);
          });
          return { damage:2.5 };
        } }
    ] 
  },
  { 
    id: 'martialArtist', name: '格斗家', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=martialArtist', 
    maxHp: 7.0, maxEnergy: 3,
    skills: [
      { name: '一技能·冲拳', description: '对敌方单体造成1.5点伤害，回复1点充能，偷取目标0.5点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { 
          const stolen = Math.min(target?.currentEnergy ||0, 0.5);
          if(target) target.currentEnergy = Math.max(0, (target.currentEnergy ||0)-stolen);
          if(caster) caster.currentEnergy = Math.min(caster.maxEnergy, (caster.currentEnergy ||0)+stolen);
          return { damage:1.5 };
        } },
      { name: '二技能·连环踢', description: '对所有敌方造成1.0点伤害，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage:1.0 }; } },
      { name: '三技能·爆气一击', description: '对所有敌方造成3.0点伤害，偷取每个目标0.5点充能', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { 
          return { damage:3.0 };
        } }
    ] 
  },
  { 
    id: 'dancer', name: '舞娘', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=dancer', 
    maxHp: 6.0, maxEnergy: 3,
    skills: [
      { name: '一技能·鼓舞', description: '为一名友方回复1点充能，自身回复1点充能', cooldown: 0, energyGain: 1, targetType: 'ally',
        effect: (target, caster) => { 
          if(target) target.currentEnergy = Math.min(target.maxEnergy, (target.currentEnergy ||0)+1);
          if(caster) caster.currentEnergy = Math.min(caster.maxEnergy, (caster.currentEnergy ||0)+1);
          return { damage:0 };
        } },
      { name: '二技能·嘲讽歌舞', description: '为所有敌方附加「嘲讽」持续2回合，回复2点充能', cooldown: 3, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { buff: BUFF_LIST.taunt }; } },
      { name: '三技能·战歌', description: '为所有友方附加「攻击强化」和「闪避」持续2回合', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (target, caster) => { 
          caster?.battleRoles?.forEach(role => {
            if (role && role.currentHp >0) {
              role.buffs.push({...BUFF_LIST.attackUp, duration:2});
              role.buffs.push({...BUFF_LIST.dodge, duration:2});
            }
          });
          return { damage:0 };
        } }
    ] 
  },
  { 
    id: 'bloodMage', name: '血法师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=bloodMage', 
    maxHp: 6.0, maxEnergy: 4,
    skills: [
      { name: '一技能·血契', description: '对敌方单体造成2.0点伤害，恢复等同于伤害的血量，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { 
          const dmg =2.0;
          if(caster) caster.currentHp = Math.min(caster.maxHp, caster.currentHp +dmg);
          return { damage:dmg };
        } },
      { name: '二技能·血之漩涡', description: '对所有敌方造成1.5点伤害，恢复总伤害50%的血量，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { 
          const dmg =1.5;
          if(caster) caster.currentHp = Math.min(caster.maxHp, caster.currentHp + (dmg *0.5));
          return { damage:dmg };
        } },
      { name: '三技能·血祭', description: '自身损失3.0点血量，对所有敌方造成5.0点伤害', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { 
          if(caster) caster.currentHp = Math.max(0, caster.currentHp -3.0);
          return { damage:5.0 };
        } }
    ] 
  }
];

export const GAME_CONFIG = {
  MAX_ROUND: 20,
  ROLES_PER_PLAYER: 3
};
