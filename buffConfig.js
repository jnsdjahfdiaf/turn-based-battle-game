// ==============================
// 🔧 Buff编辑区 - 可自由添加/修改Buff效果
// 参数说明：
// id: 唯一标识
// name: Buff显示名称
// type: buff正面/debuff负面
// description: 鼠标悬浮提示
// duration: 默认持续回合数
// effect: Buff生效时的逻辑（修改角色属性）
// onTurnEnd: 每回合结束时触发的逻辑（比如灼伤掉血）
// ==============================
// buffConfig.js 完整可运行版本
export const BUFF_LIST = {
  // 灼伤：每回合掉0.5心
  BURN: {
    id: 'burn',
    name: '灼伤',
    type: 'debuff',
    description: '每回合受到0.5心伤害',
    onTurnEnd: (role) => {
      role.currentHp = Math.max(0, role.currentHp - 0.5);
    }
  },
  // 减速：这里只是标记，不做额外处理，搭配受击已经不需要了
  SLOW: {
    id: 'slow',
    name: '减速',
    type: 'debuff',
    description: '先手权降低',
  },
  // 寒霜：受到伤害增加10%
  FROST: {
    id: 'frost',
    name: '寒霜',
    type: 'debuff',
    description: '受到伤害增加10%',
    effect: (role) => {
      role.damageTakenMultiplier *= 1.1;
    }
  },
  // 眩晕：无法行动
  STUN: {
    id: 'stun',
    name: '眩晕',
    type: 'debuff',
    description: '本回合无法行动',
    onTurnEnd: (role) => {
      role.canAttack = false;
    }
  },
  // 护盾：吸收指定数量伤害
  SHIELD: {
    id: 'shield',
    name: '护盾',
    type: 'buff',
    description: '吸收伤害',
    effect: (role, extraData) => {
      role.shield += extraData;
    }
  },
  // 伤害减半
  DAMAGE_REDUCTION: {
    id: 'damage_reduction',
    name: '伤害减半',
    type: 'debuff',
    description: '造成的伤害减半',
    effect: (role) => {
      role.damageDealtMultiplier *= 0.5;
    }
  },
  // 伤害翻倍
  DOUBLE_DAMAGE: {
    id: 'double_damage',
    name: '伤害翻倍',
    type: 'buff',
    description: '造成的伤害翻倍',
    effect: (role) => {
      role.damageDealtMultiplier *= 2;
    }
  },
  // 加速：先手权增加
  SPEED_UP: {
    id: 'speed_up',
    name: '加速',
    type: 'buff',
    description: '先手权提升',
    effect: (role) => {
      role.initiativeModifier += 10;
    }
  },
  // 净化：移除所有负面Buff
  PURIFY: {
    id: 'purify',
    name: '净化',
    type: 'buff',
    description: '清除所有负面Buff',
    effect: (role) => {
      role.buffs = role.buffs.filter(b => b.type === 'buff');
    }
  }
};
    onTurnEnd: null
  }
  // TODO: 在这里新增你想要的Buff
};
