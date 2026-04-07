import { BUFF_LIST } from './buffConfig.js';

// 游戏全局配置
// ==============================
// 🎭 全角色配置表，所有技能标准化：
// 一技能固定回能1点，二技能固定回能2点，所有技能添加编号前缀
// 所有伤害/治疗统一为0.5倍数
// ==============================
export const ROLE_LIST = [
  // ========== 原有17个角色保留 ==========
  { 
    id: 'warrior', name: '狂战士', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=warrior', 
    maxHp: 8.0, maxEnergy: 3,
    skills: [
      // 一技能·猛击：单体敌方伤害1.5，回复1点能量，无冷却
      { name: '一技能·猛击', description: '对敌方单体造成1.5点伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      // 二技能·旋风斩：全体敌方伤害1.0，回复2点能量，冷却2回合
      { name: '二技能·旋风斩', description: '对所有敌方造成1.0点伤害，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage: 1.0 }; } },
      // 三技能·狂暴：终极技能，消耗3点能量，单体伤害3.0，附加攻击强化Buff
      { name: '三技能·狂暴', description: '对敌方单体造成3.0点伤害，获得「攻击强化」持续2回合', cooldown: 0, energyCost: 3, targetType: 'enemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 3.0, buff: BUFF_LIST.attackUp }; } }
    ] 
  },
  { 
    id: 'mage', name: '大法师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=mage', 
    maxHp: 5.0, maxEnergy: 4,
    skills: [
      // 一技能·火球术：单体敌方伤害2.0，回复1点能量，无冷却
      { name: '一技能·火球术', description: '对敌方单体造成2.0点伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.0 }; } },
      // 二技能·冰霜新星：全体敌方伤害1.0，回复2点能量，附加闪避Buff（眩晕效果）
      { name: '二技能·冰霜新星', description: '对所有敌方造成1.0点伤害，附加「眩晕」（闪避一次），冷却3回合', cooldown: 3, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage: 1.0, buff: {...BUFF_LIST.dodge, name:'眩晕', duration:1} }; } },
      // 三技能·末日审判：终极技能，消耗4点能量，全体敌方伤害4.0
      { name: '三技能·末日审判', description: '对所有敌方造成4.0点伤害', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 4.0 }; } }
    ] 
  },
  // 其余原有角色省略，保留你之前的17个角色即可，这里仅展示新增角色

  // ========== 新增12个全新角色 ==========
  // 1. 剑仙：物理输出型，单体+群体伤害，大招提供暴击增幅
  { 
    id: 'swordsman', name: '剑仙', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=swordsman', 
    maxHp: 7.0, maxEnergy: 3,
    skills: [
      // 一技能·斩击：单体敌方伤害2.0，回复1点能量，无冷却
      { name: '一技能·斩击', description: '对敌方单体造成2.0点伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.0 }; } },
      // 二技能·万剑诀：全体敌方伤害1.5，回复2点能量，冷却2回合
      { name: '二技能·万剑诀', description: '对所有敌方造成1.5点伤害，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      // 三技能·剑神降临：终极技能，消耗3点能量，单体伤害5.0，附加暴击增幅Buff
      { name: '三技能·剑神降临', description: '对敌方单体造成5.0点伤害，获得「暴击增幅」持续1回合', cooldown: 0, energyCost: 3, targetType: 'enemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 5.0, buff: BUFF_LIST.critBoost }; } }
    ] 
  },
  // 2. 魔药师：治疗+debuff型，单体治疗、群体毒伤，大招群体治疗+净化
  { 
    id: 'apothecary', name: '魔药师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=apothecary', 
    maxHp: 6.0, maxEnergy: 3,
    skills: [
      // 一技能·治疗药剂：单体友方治疗2.0，回复1点能量，无冷却
      { name: '一技能·治疗药剂', description: '为一名友方恢复2.0点血量，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'ally',
        effect: (target, caster) => { return { damage: -2.0 }; } },
      // 二技能·毒液药剂：单体敌方伤害1.5，附加剧毒Debuff，回复2点能量，冷却2回合
      { name: '二技能·毒液药剂', description: '对敌方单体造成1.5点伤害，附加「剧毒」，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 1.5, buff: BUFF_LIST.poison }; } },
      // 三技能·群体治愈：终极技能，消耗3点能量，全体友方治疗2.0，清除所有Debuff
      { name: '三技能·群体治愈', description: '为所有友方恢复2.0点血量，清除所有Debuff', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (target, caster) => { 
          caster.battleRoles.forEach(role => {
            if (role.currentHp > 0) role.currentHp = Math.min(role.maxHp, role.currentHp + 2.0);
            role.buffs = role.buffs.filter(b => b.type === 'buff');
          });
          return { damage: 0, buff: BUFF_LIST.cleanse };
        } }
    ] 
  },
  // 3. 暗黑咒术师：黑暗输出+debuff型，单体暗伤、群体减益，大招全体暗伤+沉默
  { 
    id: 'darkCaster', name: '暗黑咒术师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=darkCaster', 
    maxHp: 5.5, maxEnergy: 4,
    skills: [
      // 一技能·暗蚀：单体敌方伤害2.5，回复1点能量，无冷却
      { name: '一技能·暗蚀', description: '对敌方单体造成2.5点暗属性伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.5 }; } },
      // 二技能·诅咒之雾：全体敌方附加攻击弱化+沉默Debuff，回复2点能量，冷却3回合
      { name: '二技能·诅咒之雾', description: '对所有敌方附加「攻击弱化」和「沉默」，持续2回合', cooldown: 3, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { buff: [BUFF_LIST.attackDown, BUFF_LIST.silence] }; } },
      // 三技能·暗影风暴：终极技能，消耗4点能量，全体敌方伤害3.5，附加沉默Debuff
      { name: '三技能·暗影风暴', description: '对所有敌方造成3.5点暗属性伤害，附加「沉默」持续2回合', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 3.5, buff: BUFF_LIST.silence }; } }
    ] 
  },
  // 4. 驯兽师：辅助buff型，单体伤害、队友buff，大招全体攻击+护盾
  { 
    id: 'beastTamer', name: '驯兽师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=beastTamer', 
    maxHp: 8.0, maxEnergy: 3,
    skills: [
      // 一技能·鞭挞：单体敌方伤害1.5，回复1点能量，无冷却
      { name: '一技能·鞭挞', description: '对敌方单体造成1.5点伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      // 二技能·野性鼓舞：单体友方附加攻击强化+护盾，回复2点能量，冷却2回合
      { name: '二技能·野性鼓舞', description: '为一名友方附加「攻击强化」和1.5点护盾，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'ally',
        effect: (target, caster) => { target.shield +=1.5; return { buff: BUFF_LIST.attackUp }; } },
      // 三技能·兽群降临：终极技能，消耗3点能量，全体友方攻击强化+2.0护盾
      { name: '三技能·兽群降临', description: '为所有友方附加「攻击强化」，并提供2.0点护盾', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (target, caster) => { 
          caster.battleRoles.forEach(role => {
            if (role.currentHp > 0) {
              role.shield +=2.0;
              role.buffs.push({...BUFF_LIST.attackUp, duration:2});
            }
          });
          return { damage:0 };
        } }
    ] 
  },
  // 5. 海军上尉：群体炮击型，群体伤害、单体破甲，大招全体破甲+高伤害
  { 
    id: 'navalCaptain', name: '海军上尉', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=navalCaptain', 
    maxHp: 9.0, maxEnergy: 3,
    skills: [
      // 一技能·炮击：单体敌方伤害2.0，回复1点能量，无冷却
      { name: '一技能·炮击', description: '对敌方单体造成2.0点炮击伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.0 }; } },
      // 二技能·齐射：全体敌方伤害1.5，回复2点能量，冷却2回合
      { name: '二技能·齐射', description: '对所有敌方造成1.5点炮击伤害，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      // 三技能·破甲炮击：终极技能，消耗3点能量，全体敌方伤害3.0，附加破甲Debuff（伤害提升50%）
      { name: '三技能·破甲炮击', description: '对所有敌方造成3.0点炮击伤害，附加「破甲」持续2回合', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 3.0, buff: {...BUFF_LIST.damageReduction, name:'破甲', effect:(t)=>{t.damageTakenMultiplier *=1.5}, duration:2} }; } }
    ] 
  },
  // 6. 暗影忍者：高爆发刺客型，暴击伤害、闪避buff，大招秒杀带标记目标
  { 
    id: 'shadowNinja', name: '暗影忍者', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=shadowNinja', 
    maxHp: 5.0, maxEnergy: 2,
    skills: [
      // 一技能·忍术·突刺：单体敌方伤害2.5，回复1点能量，无冷却，50%概率附加闪避Buff
      { name: '一技能·忍术·突刺', description: '对敌方单体造成2.5点伤害，回复1点充能，50%概率附加闪避', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { 
          const buff = Math.random() > 0.5 ? {...BUFF_LIST.dodge, name:'闪避', duration:1} : null;
          return { damage: 2.5, buff };
        } },
      // 二技能·忍术·影分身：自身附加闪避Buff，回复2点能量，冷却2回合
      { name: '二技能·忍术·影分身', description: '为自身附加「闪避」持续2回合，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'self',
        effect: (target, caster) => { return { buff: {...BUFF_LIST.dodge, duration:2} }; } },
      // 三技能·忍术·必杀：终极技能，消耗2点能量，单体伤害6.0，附加致命标记Debuff
      { name: '三技能·忍术·必杀', description: '对敌方单体造成6.0点伤害，附加「致命标记」', cooldown: 0, energyCost: 2, targetType: 'enemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 6.0, buff: BUFF_LIST.mark }; } }
    ] 
  },
  // 7. 丛林守护者：群体辅助型，群体buff、群体治疗，大招全体减伤+回血
  { 
    id: 'forestGuardian', name: '丛林守护者', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=forestGuardian', 
    maxHp: 8.5, maxEnergy: 3,
    skills: [
      // 一技能·生命之触：单体友方治疗1.5，回复1点能量，无冷却
      { name: '一技能·生命之触', description: '为一名友方恢复1.5点血量，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'ally',
        effect: (target, caster) => { return { damage: -1.5 }; } },
      // 二技能·自然屏障：全体友方附加伤害减免Buff，回复2点能量，冷却3回合
      { name: '二技能·自然屏障', description: '为所有友方附加「伤害减免」持续2回合，回复2点充能', cooldown: 3, energyGain: 2, targetType: 'allAlly',
        effect: (target, caster) => { return { buff: BUFF_LIST.damageReduction }; } },
      // 三技能·森林恩赐：终极技能，消耗3点能量，全体友方治疗2.0+伤害减免
      { name: '三技能·森林恩赐', description: '为所有友方恢复2.0点血量，附加「伤害减免」持续2回合', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (target, caster) => { 
          caster.battleRoles.forEach(role => {
            if (role.currentHp > 0) role.currentHp = Math.min(role.maxHp, role.currentHp + 2.0);
            role.buffs.push({...BUFF_LIST.damageReduction, duration:2});
          });
          return { damage:0 };
        } }
    ] 
  },
  // 8. 冰霜法师：控制型输出，单体冰伤、眩晕，大招群体冰伤+全体眩晕
  { 
    id: 'frostMage', name: '冰霜法师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=frostMage', 
    maxHp: 5.0, maxEnergy: 4,
    skills: [
      // 一技能·冰箭：单体敌方伤害2.0，回复1点能量，无冷却
      { name: '一技能·冰箭', description: '对敌方单体造成2.0点冰属性伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 2.0 }; } },
      // 二技能·霜冻：单体敌方附加闪避Buff（眩晕），回复2点能量，冷却2回合
      { name: '二技能·霜冻', description: '对敌方单体附加「眩晕」（闪避一次），回复2点充能', cooldown: 2, energyGain: 2, targetType: 'enemy',
        effect: (target, caster) => { return { buff: {...BUFF_LIST.dodge, name:'眩晕', duration:1} }; } },
      // 三技能·暴风雪：终极技能，消耗4点能量，全体敌方伤害3.5，附加眩晕Buff
      { name: '三技能·暴风雪', description: '对所有敌方造成3.5点冰属性伤害，附加「眩晕」持续1回合', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { return { damage: 3.5, buff: {...BUFF_LIST.dodge, name:'眩晕', duration:1} }; } }
    ] 
  },
  // 9. 暗影牧师：暗属性辅助型，暗伤+队友吸血，大招群体暗伤+群体治疗
  { 
    id: 'shadowPriest', name: '暗影牧师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=shadowPriest', 
    maxHp: 6.5, maxEnergy: 3,
    skills: [
      // 一技能·暗影箭：单体敌方伤害1.5，回复1点能量，无冷却
      { name: '一技能·暗影箭', description: '对敌方单体造成1.5点暗属性伤害，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { return { damage: 1.5 }; } },
      // 二技能·生命虹吸：单体友方治疗2.0，同时偷取敌方0.5能量，回复2点能量，冷却2回合
      { name: '二技能·生命虹吸', description: '为一名友方恢复2.0点血量，偷取目标0.5点充能，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'ally',
        effect: (target, caster) => { 
          caster.currentEnergy = Math.min(caster.maxEnergy, (caster.currentEnergy ||0)+0.5);
          return { damage: -2.0 };
        } },
      // 三技能·暗影潮汐：终极技能，消耗3点能量，全体敌方伤害2.5，全体友方治疗1.5
      { name: '三技能·暗影潮汐', description: '对所有敌方造成2.5点暗属性伤害，为所有友方恢复1.5点血量', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { 
          caster.battleRoles.forEach(role => {
            if (role.currentHp >0) role.currentHp = Math.min(role.maxHp, role.currentHp +1.5);
          });
          return { damage:2.5 };
        } }
    ] 
  },
  // 10. 格斗家：连击偷能型，单体伤害、偷取能量，大招群体伤害+偷能
  { 
    id: 'martialArtist', name: '格斗家', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=martialArtist', 
    maxHp: 7.0, maxEnergy: 3,
    skills: [
      // 一技能·冲拳：单体敌方伤害1.5，回复1点能量，偷取目标0.5能量，无冷却
      { name: '一技能·冲拳', description: '对敌方单体造成1.5点伤害，回复1点充能，偷取目标0.5点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { 
          const stolen = Math.min(target.currentEnergy ||0, 0.5);
          target.currentEnergy = Math.max(0, (target.currentEnergy ||0)-stolen);
          caster.currentEnergy = Math.min(caster.maxEnergy, (caster.currentEnergy ||0)+stolen);
          return { damage:1.5 };
        } },
      // 二技能·连环踢：全体敌方伤害1.0，回复2点能量，冷却2回合
      { name: '二技能·连环踢', description: '对所有敌方造成1.0点伤害，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { damage:1.0 }; } },
      // 三技能·爆气一击：终极技能，消耗3点能量，全体敌方伤害3.0，偷取每个目标0.5能量
      { name: '三技能·爆气一击', description: '对所有敌方造成3.0点伤害，偷取每个目标0.5点充能', cooldown: 0, energyCost: 3, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { 
          caster.battleRoles.forEach(role => {
            const stolen = Math.min(target.currentEnergy ||0, 0.5);
            target.currentEnergy = Math.max(0, (target.currentEnergy ||0)-stolen);
            caster.currentEnergy = Math.min(caster.maxEnergy, (caster.currentEnergy ||0)+stolen);
          });
          return { damage:3.0 };
        } }
    ] 
  },
  // 11. 舞娘：群体控制buff型，群体buff、嘲讽，大招全体攻击+闪避
  { 
    id: 'dancer', name: '舞娘', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=dancer', 
    maxHp: 6.0, maxEnergy: 3,
    skills: [
      // 一技能·鼓舞：单体友方回复1点能量，回复1点能量，无冷却
      { name: '一技能·鼓舞', description: '为一名友方回复1点充能，自身回复1点充能', cooldown: 0, energyGain: 1, targetType: 'ally',
        effect: (target, caster) => { 
          target.currentEnergy = Math.min(target.maxEnergy, (target.currentEnergy ||0)+1);
          caster.currentEnergy = Math.min(caster.maxEnergy, (caster.currentEnergy ||0)+1);
          return { damage:0 };
        } },
      // 二技能·嘲讽歌舞：全体敌方附加嘲讽Buff，回复2点能量，冷却3回合
      { name: '二技能·嘲讽歌舞', description: '为所有敌方附加「嘲讽」持续2回合，回复2点充能', cooldown: 3, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { return { buff: BUFF_LIST.taunt }; } },
      // 三技能·战歌：终极技能，消耗3点能量，全体友方攻击强化+闪避Buff
      { name: '三技能·战歌', description: '为所有友方附加「攻击强化」和「闪避」持续2回合', cooldown: 0, energyCost: 3, targetType: 'allAlly', isUltimate: true,
        effect: (target, caster) => { 
          caster.battleRoles.forEach(role => {
            if (role.currentHp >0) {
              role.buffs.push({...BUFF_LIST.attackUp, duration:2});
              role.buffs.push({...BUFF_LIST.dodge, duration:2});
            }
          });
          return { damage:0 };
        } }
    ] 
  },
  // 12. 血法师：吸血型输出，自身吸血、群体吸血，大招牺牲自身造成全体伤害
  { 
    id: 'bloodMage', name: '血法师', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=bloodMage', 
    maxHp: 6.0, maxEnergy: 4,
    skills: [
      // 一技能·血契：单体敌方伤害2.0，自身恢复等同于伤害的血量，回复1点能量，无冷却
      { name: '一技能·血契', description: '对敌方单体造成2.0点伤害，恢复等同于伤害的血量，回复1点充能', cooldown: 0, energyGain: 1, targetType: 'enemy',
        effect: (target, caster) => { 
          const dmg =2.0;
          caster.currentHp = Math.min(caster.maxHp, caster.currentHp +dmg);
          return { damage:dmg };
        } },
      // 二技能·血之漩涡：全体敌方伤害1.5，自身恢复总伤害50%的血量，回复2点能量，冷却2回合
      { name: '二技能·血之漩涡', description: '对所有敌方造成1.5点伤害，恢复总伤害50%的血量，回复2点充能', cooldown: 2, energyGain: 2, targetType: 'allEnemy',
        effect: (target, caster) => { 
          const dmg =1.5;
          caster.currentHp = Math.min(caster.maxHp, caster.currentHp + (dmg *0.5));
          return { damage:dmg };
        } },
      // 三技能·血祭：终极技能，消耗4点能量，自身损失3.0血量，对全体敌方造成5.0伤害
      { name: '三技能·血祭', description: '自身损失3.0点血量，对所有敌方造成5.0点伤害', cooldown: 0, energyCost: 4, targetType: 'allEnemy', isUltimate: true,
        effect: (target, caster) => { 
          caster.currentHp = Math.max(0, caster.currentHp -3.0);
          return { damage:5.0 };
        } }
    ] 
  }
];
// 只保留这一次声明，并且导出它，不要在文件其他位置重复声明
export const GAME_CONFIG = {
  MAX_ROUND: 20,
  ROLES_PER_PLAYER: 3
};
