import { BUFF_LIST } from './buffConfig.js';
// ==============================
// 🔧 角色编辑区 - 可自由添加/修改角色
// 角色参数说明：
// id: 唯一标识，不能重复
// name: 角色显示名称
// avatar: 角色头像链接（可替换为自己的图片路径）
// maxHp: 最大血量，对应显示几颗心（支持0.5为单位）
// skills: 技能列表，必须包含3个技能（1普攻/2小技能/3大招）
//   技能参数说明：
//   name: 技能名称
//   type: damage伤害/heal治疗/buff增益
//   description: 技能描述，显示在UI上
//   cooldown: 冷却回合数，0为无冷却
//   targetType: 目标类型（enemy敌方/ally己方/self自己/allEnemy全体敌方/allAlly全体己方）
//   hitRate: 命中率，0-1之间，1为必中
//   effect: 技能效果函数，返回伤害和Buff结果
// ==============================
import { BUFF_LIST } from './buffConfig.js';
// ==============================
// 角色配置，已经全改为100%命中，符合要求
// ==============================
export const ROLE_LIST = [
  {
    id: 'warrior',
    name: '烈焰战士',
    avatar: 'https://picsum.photos/seed/warrior/100/100',
    maxHp: 6,
    skills: [
      {
        name: '重斩',
        type: 'damage',
        description: '对敌方造成1-2心伤害',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 1 + Math.random();
          return { damage, buff: null };
        }
      },
      {
        name: '烈火斩',
        type: 'damage',
        description: '对敌方造成2-3心伤害，30%概率附加2回合灼伤',
        cooldown: 2,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 2 + Math.random();
          const buff = Math.random() < 0.3 ? { ...BUFF_LIST.BURN, duration: 2 } : null;
          return { damage, buff };
        }
      },
      {
        name: '烈焰风暴',
        type: 'damage',
        description: '对全体敌方造成2.5心伤害',
        cooldown: 5,
        targetType: 'allEnemy',
        hitRate: 1,
        effect: (target, caster) => ({ damage: 2.5, buff: null })
      }
    ]
  },
  {
    id: 'mage',
    name: '寒霜法师',
    avatar: 'https://picsum.photos/seed/mage/100/100',
    maxHp: 4.5,
    skills: [
      {
        name: '冰箭',
        type: 'damage',
        description: '对敌方造成0.5-1.5心伤害，20%概率附加1回合减速',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 0.5 + Math.random();
          const buff = Math.random() < 0.2 ? { ...BUFF_LIST.SLOW, duration: 1 } : null;
          return { damage, buff };
        }
      },
      {
        name: '冰盾',
        type: 'buff',
        description: '给己方角色添加2心护盾',
        cooldown: 3,
        targetType: 'ally',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: { ...BUFF_LIST.SHIELD, duration: 2, extraData: 2 }
        })
      },
      {
        name: '绝对零度',
        type: 'damage',
        description: '对全体敌方造成2心伤害，50%概率附加2回合寒霜',
        cooldown: 4,
        targetType: 'allEnemy',
        hitRate: 1,
        effect: (target, caster) => {
          const buff = Math.random() < 0.5 ? { ...BUFF_LIST.FROST, duration: 2 } : null;
          return { damage: 2, buff };
        }
      }
    ]
  },
  {
    id: 'priest',
    name: '光明牧师',
    avatar: 'https://picsum.photos/seed/priest/100/100',
    maxHp: 5,
    skills: [
      {
        name: '圣光弹',
        type: 'damage',
        description: '对敌方造成0.5-1心伤害',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => ({ damage: 0.5 + Math.random() * 0.5, buff: null })
      },
      {
        name: '治愈术',
        type: 'heal',
        description: '为己方角色恢复1-3心血量',
        cooldown: 2,
        targetType: 'ally',
        hitRate: 1,
        effect: (target, caster) => ({ damage: -(1 + Math.random() * 2), buff: null })
      },
      {
        name: '神圣净化',
        type: 'buff',
        description: '净化己方所有负面buff，并添加1回合伤害翻倍',
        cooldown: 4,
        targetType: 'allAlly',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: [BUFF_LIST.PURIFY, { ...BUFF_LIST.DOUBLE_DAMAGE, duration: 1 }]
        })
      }
    ]
  },
  {
    id: 'assassin',
    name: '暗影刺客',
    avatar: 'https://picsum.photos/seed/assassin/100/100',
    maxHp: 4,
    skills: [
      {
        name: '背刺',
        type: 'damage',
        description: '对敌方造成1-2心伤害，20%概率眩晕1回合',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 1 + Math.random();
          const buff = Math.random() < 0.2 ? { ...BUFF_LIST.STUN, duration: 1 } : null;
          return { damage, buff };
        }
      },
      {
        name: '暗影突袭',
        type: 'damage',
        description: '对敌方造成2-3心伤害，50%概率减速2回合',
        cooldown: 2,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 2 + Math.random();
          const buff = Math.random() < 0.5 ? { ...BUFF_LIST.SLOW, duration: 2 } : null;
          return { damage, buff };
        }
      },
      {
        name: '斩杀',
        type: 'damage',
        description: '对血量低于30%的敌方造成4心伤害',
        cooldown: 4,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = target.currentHp / target.maxHp < 0.3 ? 4 : 2;
          return { damage, buff: null };
        }
      }
    ]
  },
  {
    id: 'tank',
    name: '重装坦克',
    avatar: 'https://picsum.photos/seed/tank/100/100',
    maxHp: 7.5,
    skills: [
      {
        name: '盾击',
        type: 'damage',
        description: '对敌方造成0.5-1心伤害，30%概率眩晕1回合',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 0.5 + Math.random() * 0.5;
          const buff = Math.random() < 0.3 ? { ...BUFF_LIST.STUN, duration: 1 } : null;
          return { damage, buff };
        }
      },
      {
        name: '钢铁之躯',
        type: 'buff',
        description: '给自己添加3心护盾+2回合伤害减半',
        cooldown: 3,
        targetType: 'self',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: [
            { ...BUFF_LIST.SHIELD, duration: 2, extraData: 3 },
            { ...BUFF_LIST.DAMAGE_REDUCTION, duration: 2 }
          ]
        })
      },
      {
        name: '群体嘲讽',
        type: 'buff',
        description: '全体敌方附加2回合伤害减半',
        cooldown: 4,
        targetType: 'allEnemy',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: { ...BUFF_LIST.DAMAGE_REDUCTION, duration: 2 }
        })
      }
    ]
  },
  {
    id: 'ranger',
    name: '丛林游侠',
    avatar: 'https://picsum.photos/seed/ranger/100/100',
    maxHp: 4.5,
    skills: [
      {
        name: '毒箭',
        type: 'damage',
        description: '对敌方造成0.5-1.5心伤害，30%概率附加2回合灼伤',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 0.5 + Math.random();
          const buff = Math.random() < 0.3 ? { ...BUFF_LIST.BURN, duration: 2 } : null;
          return { damage, buff };
        }
      },
      {
        name: '藤蔓缠绕',
        type: 'buff',
        description: '给敌方附加2回合减速+1回合眩晕',
        cooldown: 2,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: [
            { ...BUFF_LIST.SLOW, duration: 2 },
            { ...BUFF_LIST.STUN, duration: 1 }
          ]
        })
      },
      {
        name: '箭雨',
        type: 'damage',
        description: '全体敌方造成1.5心伤害，40%概率附加2回合灼伤',
        cooldown: 4,
        targetType: 'allEnemy',
        hitRate: 1,
        effect: (target, caster) => {
          const buff = Math.random() < 0.4 ? { ...BUFF_LIST.BURN, duration: 2 } : null;
          return { damage: 1.5, buff };
        }
      }
    ]
  },
  {
    id: 'paladin',
    name: '神圣圣骑士',
    avatar: 'https://picsum.photos/seed/paladin/100/100',
    maxHp: 6,
    skills: [
      {
        name: '圣光打击',
        type: 'damage',
        description: '对敌方造成1-1.5心伤害',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => ({ damage: 1 + Math.random() * 0.5, buff: null })
      },
      {
        name: '圣疗术',
        type: 'heal',
        description: '为己方角色恢复2-3心血量+净化负面Buff',
        cooldown: 2,
        targetType: 'ally',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: -(2 + Math.random()),
          buff: BUFF_LIST.PURIFY
        })
      },
      {
        name: '神圣屏障',
        type: 'buff',
        description: '全体己方添加2心护盾+净化所有负面Buff',
        cooldown: 4,
        targetType: 'allAlly',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: [
            BUFF_LIST.PURIFY,
            { ...BUFF_LIST.SHIELD, duration: 2, extraData: 2 }
          ]
        })
      }
    ]
  },
  {
    id: 'warlock',
    name: '咒术师',
    avatar: 'https://picsum.photos/seed/warlock/100/100',
    maxHp: 4,
    skills: [
      {
        name: '诅咒之触',
        type: 'damage',
        description: '对敌方造成0.5-1心伤害，20%概率附加2回合伤害减半',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 0.5 + Math.random() * 0.5;
          const buff = Math.random() < 0.2 ? { ...BUFF_LIST.DAMAGE_REDUCTION, duration: 2 } : null;
          return { damage, buff };
        }
      },
      {
        name: '虚弱咒',
        type: 'buff',
        description: '给敌方附加2回合伤害减半+减速',
        cooldown: 2,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: [
            { ...BUFF_LIST.DAMAGE_REDUCTION, duration: 2 },
            { ...BUFF_LIST.SLOW, duration: 2 }
          ]
        })
      },
      {
        name: '群体诅咒',
        type: 'buff',
        description: '全体敌方附加2回合减速+50%概率附加2回合灼伤',
        cooldown: 4,
        targetType: 'allEnemy',
        hitRate: 1,
        effect: (target, caster) => {
          const buff = Math.random() < 0.5 ? [
            { ...BUFF_LIST.SLOW, duration: 2 },
            { ...BUFF_LIST.BURN, duration: 2 }
          ] : [{ ...BUFF_LIST.SLOW, duration: 2 }];
          return { damage: 0, buff };
        }
      }
    ]
  },
  {
    id: 'engineer',
    name: '爆破工程师',
    avatar: 'https://picsum.photos/seed/engineer/100/100',
    maxHp: 5,
    skills: [
      {
        name: '手雷',
        type: 'damage',
        description: '对敌方造成1-2心伤害，30%概率附加2回合灼伤',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 1 + Math.random();
          const buff = Math.random() < 0.3 ? { ...BUFF_LIST.BURN, duration: 2 } : null;
          return { damage, buff };
        }
      },
      {
        name: '定时炸弹',
        type: 'damage',
        description: '对敌方造成2-3心伤害',
        cooldown: 3,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => ({ damage: 2 + Math.random(), buff: null })
      },
      {
        name: '自爆',
        type: 'damage',
        description: '全体敌方造成3心伤害，自身损失2心',
        cooldown: 5,
        targetType: 'allEnemy',
        hitRate: 1,
        effect: (target, caster) => {
          caster.currentHp = Math.max(0, caster.currentHp - 2);
          return { damage: 3, buff: null };
        }
      }
    ]
  },
  {
    id: 'necromancer',
    name: '死灵术士',
    avatar: 'https://picsum.photos/seed/necromancer/100/100',
    maxHp: 4.5,
    skills: [
      {
        name: '吸血爪',
        type: 'damage',
        description: '对敌方造成0.5-1.5心伤害，50%概率将伤害转化为自身血量',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 0.5 + Math.random();
          if (Math.random() < 0.5) {
            caster.currentHp = Math.min(caster.maxHp, caster.currentHp + damage);
          }
          return { damage, buff: null };
        }
      },
      {
        name: '衰老咒',
        type: 'buff',
        description: '给敌方附加2回合伤害减半+减速',
        cooldown: 2,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: [
            { ...BUFF_LIST.DAMAGE_REDUCTION, duration: 2 },
            { ...BUFF_LIST.SLOW, duration: 2 }
          ]
        })
      },
      {
        name: '亡灵附身',
        type: 'buff',
        description: '全体己方附加2回合伤害翻倍+1心护盾',
        cooldown: 4,
        targetType: 'allAlly',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: [
            { ...BUFF_LIST.DOUBLE_DAMAGE, duration: 2 },
            { ...BUFF_LIST.SHIELD, duration: 2, extraData: 1 }
          ]
        })
      }
    ]
  },
  {
    id: 'ice_archer',
    name: '冰雪射手',
    avatar: 'https://picsum.photos/seed/icearcher/100/100',
    maxHp: 4,
    skills: [
      {
        name: '冰箭',
        type: 'damage',
        description: '对敌方造成0.5-1.5心伤害，30%概率附加2回合寒霜',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 0.5 + Math.random();
          const buff = Math.random() < 0.3 ? { ...BUFF_LIST.FROST, duration: 2 } : null;
          return { damage, buff };
        }
      },
      {
        name: '冰冻陷阱',
        type: 'buff',
        description: '给敌方附加1回合眩晕',
        cooldown: 3,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: { ...BUFF_LIST.STUN, duration: 1 }
        })
      },
      {
        name: '暴风雪',
        type: 'damage',
        description: '全体敌方造成1.5心伤害，60%概率附加2回合寒霜+1回合减速',
        cooldown: 4,
        targetType: 'allEnemy',
        hitRate: 1,
        effect: (target, caster) => {
          const buff = Math.random() < 0.6 ? [
            { ...BUFF_LIST.FROST, duration: 2 },
            { ...BUFF_LIST.SLOW, duration: 1 }
          ] : null;
          return { damage: 1.5, buff };
        }
      }
    ]
  },
  {
    id: 'berserker',
    name: '狂战士',
    avatar: 'https://picsum.photos/seed/berserker/100/100',
    maxHp: 5.5,
    skills: [
      {
        name: '狂砍',
        type: 'damage',
        description: '对敌方造成1-2.5心伤害，自身损失0.5心',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const damage = 1 + Math.random() * 1.5;
          caster.currentHp = Math.max(0, caster.currentHp - 0.5);
          return { damage, buff: null };
        }
      },
      {
        name: '狂暴',
        type: 'buff',
        description: '给自己附加2回合伤害翻倍+加速',
        cooldown: 2,
        targetType: 'self',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: [
            { ...BUFF_LIST.DOUBLE_DAMAGE, duration: 2 },
            { ...BUFF_LIST.SPEED_UP, duration: 2 }
          ]
        })
      },
      {
        name: '血战到底',
        type: 'damage',
        description: '对敌方造成3-4心伤害，自身损失1心，血量越低伤害越高',
        cooldown: 4,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => {
          const hpRate = caster.currentHp / caster.maxHp;
          const extraDamage = (1 - hpRate) * 2;
          caster.currentHp = Math.max(0, caster.currentHp - 1);
          return { damage: 3 + Math.random() + extraDamage, buff: null };
        }
      }
    ]
  },
  {
    id: 'bard',
    name: '吟游诗人',
    avatar: 'https://picsum.photos/seed/bard/100/100',
    maxHp: 5,
    skills: [
      {
        name: '音波攻击',
        type: 'damage',
        description: '对敌方造成0.5-1心伤害',
        cooldown: 0,
        targetType: 'enemy',
        hitRate: 1,
        effect: (target, caster) => ({ damage: 0.5 + Math.random() * 0.5, buff: null })
      },
      {
        name: '激励之歌',
        type: 'buff',
        description: '给己方附加2回合伤害翻倍',
        cooldown: 2,
        targetType: 'ally',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: 0,
          buff: { ...BUFF_LIST.DOUBLE_DAMAGE, duration: 2 }
        })
      },
      {
        name: '狂欢曲',
        type: 'buff',
        description: '全体己方加2回合加速+回1心血量+净化负面Buff',
        cooldown: 4,
        targetType: 'allAlly',
        hitRate: 1,
        effect: (target, caster) => ({
          damage: -1,
          buff: [
            BUFF_LIST.PURIFY,
            { ...BUFF_LIST.SPEED_UP, duration: 2 }
          ]
        })
      }
    ]
  }
];
      }
    ]
  }
];
