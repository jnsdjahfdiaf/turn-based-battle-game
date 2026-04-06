// ==============================
// 🔧 Buff编辑区 - 可自由添加/修改Buff效果
// ==============================
// ==============================
// 🔧 全局Buff配置表 - 所有Buff效果统一为0.5倍数
// ==============================
export const BUFF_LIST = {
  attackUp: { 
    id: 'attackUp', name: '攻击强化', type: 'buff', 
    description: '造成的伤害提升50%，持续2回合', duration: 2,
    effect: (target) => { target.damageDealtMultiplier *= 1.5; } 
  },
  attackDown: { 
    id: 'attackDown', name: '攻击弱化', type: 'debuff', 
    description: '造成的伤害降低50%，持续2回合', duration: 2,
    effect: (target) => { target.damageDealtMultiplier *= 0.5; } 
  },
  shieldUp: { 
    id: 'shieldUp', name: '护盾', type: 'buff', 
    description: '吸收最多3.0点伤害（一次性）', duration: 0 // 一次性Buff
  },
  silence: { 
    id: 'silence', name: '沉默', type: 'debuff', 
    description: '无法使用二技能和大招，持续2回合', duration: 2 
  },
  dodge: { 
    id: 'dodge', name: '闪避', type: 'buff', 
    description: '闪避下一次单体技能，持续1回合', duration: 1 
  },
  reflect: { 
    id: 'reflect', name: '反伤', type: 'buff', 
    description: '受到伤害时反弹50%伤害，持续2回合', duration: 2,
    onHit: (target, damage) => { return { damage: damage * 0.5, targetType: 'lastAttacker' }; } 
  },
  mark: { 
    id: 'mark', name: '致命标记', type: 'debuff', 
    description: '受到的下一次伤害翻倍，持续3回合', duration: 3 
  },
  invisibility: { 
    id: 'invisibility', name: '隐身', type: 'buff', 
    description: '无法被单体技能选中，群体技能正常命中，持续2回合', duration: 2 
  },
  taunt: { 
    id: 'taunt', name: '嘲讽', type: 'buff', 
    description: '强制敌人优先攻击自己，持续2回合', duration: 2 
  },
  bleed: { 
    id: 'bleed', name: '流血', type: 'debuff', 
    description: '每回合结束时受到0.5点真实伤害，持续3回合', duration: 3,
    onTurnEnd: (target) => { target.currentHp = Math.max(0, target.currentHp - 0.5); } 
  },
  poison: { 
    id: 'poison', name: '剧毒', type: 'debuff', 
    description: '每回合结束时受到1.0点真实伤害，治疗效果减半，持续3回合', duration: 3,
    onTurnEnd: (target) => { target.currentHp = Math.max(0, target.currentHp - 1.0); },
    effect: (target) => { target.healTakenMultiplier *= 0.5; } 
  },
  burn: { 
    id: 'burn', name: '灼烧', type: 'debuff', 
    description: '每回合结束时受到0.5点真实伤害，攻击时额外造成0.5点伤害，持续3回合', duration: 3,
    onTurnEnd: (target) => { target.currentHp = Math.max(0, target.currentHp - 0.5); },
    effect: (target) => { target.extraBurnDamage = 0.5; } 
  },
  lastStand: { 
    id: 'lastStand', name: '回光返照', type: 'buff', 
    description: '首次死亡时复活，恢复2.0点血量，清除所有Buff/Debuff', duration: 0,
    onDeath: (target) => { 
      if (!target.hasRevived) {
        target.hasRevived = true;
        target.currentHp = 2.0;
        target.buffs = [];
        target.debuffs = [];
        return true; // 复活成功
      }
      return false;
    } 
  },
  critBoost: { 
    id: 'critBoost', name: '暴击增幅', type: 'buff', 
    description: '下一次单体技能伤害翻倍，持续1回合', duration: 1 
  },
  cleanse: { 
    id: 'cleanse', name: '净化', type: 'buff', 
    description: '清除所有Debuff（一次性）', duration: 0 // 一次性
  },
  damageReduction: { 
    id: 'damageReduction', name: '伤害减免', type: 'buff', 
    description: '受到的伤害降低50%，持续2回合', duration: 2,
    effect: (target) => { target.damageTakenMultiplier *= 0.5; } 
  },
  lifestealBoost: { 
    id: 'lifestealBoost', name: '吸血增强', type: 'buff', 
    description: '吸血效果翻倍，持续2回合', duration: 2,
    effect: (target) => { target.lifestealMultiplier *= 2; } 
  },
  confusion: { 
    id: 'confusion', name: '混乱', type: 'debuff', 
    description: '选择目标时会随机选择（包括友方），持续2回合', duration: 2 
  }
};
