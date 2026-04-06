// ==============================
// DOM元素缓存
// ==============================
const $ = id => document.getElementById(id);
const $stageTip = $('stage-tip');
const $roundCounter = $('round-counter');
const $roleSelectSection = $('role-select-section');
const $roleList = $('role-list');
const $player1Selected = $('player1-selected');
const $player2Selected = $('player2-selected');
const $confirmRolesBtn = $('confirm-roles');
const $positionSelectSection = $('position-select-section');
const $player1Position = $('player1-position');
const $player2Position = $('player2-position');
const $confirmPositionsBtn = $('confirm-positions');
const $battleSection = $('battle-section');
const $player1Side = $('player1-side');
const $player2Side = $('player2-side');
const $currentPlayerTip = $('current-player-tip');
const $skillList = $('skill-list');
const $targetSelectTip = $('target-select-tip');
const $resultModal = $('result-modal');
const $resultText = $('result-text');
const $resultDesc = $('result-desc');
const $restartBtn = $('restart-btn');
const $switchSelectPlayer = $('switch-select-player');

// ==============================
// 游戏全局状态
// ==============================
let gameState = {
  stage: 'roleSelect', // 整体游戏阶段：roleSelect/positionSelect/battle
  currentOperatePlayer: 1, // 当前正在操作的玩家
  round: 1,
  players: {
    1: { selectedRoles: [], positions: {}, battleRoles: [] },
    2: { selectedRoles: [], positions: {}, battleRoles: [] }
  },
  firstPlayer: null, // 先后手，结算时先手先执行技能
  // 战斗内状态
  battleStage: 'waitingAction',
  pendingActions: { // 存储双方待结算的操作
    1: null,
    2: null
  },
  selectedRole: null, // 当前操作选中的角色
  selectedSkill: null, // 当前选中的技能
  selectedSkillIndex: null,
  selectingTarget: false, // 是否正在选目标
  lastAttacker: null // 用于反伤记录
};

// ==============================
// 工具函数
// ==============================
function renderHp(hp, maxHp) {
  let html = '';
  const full = Math.floor(hp);
  const half = hp % 1 >= 0.5;
  const empty = Math.floor(maxHp) - full - (half ? 1 : 0);
  html += '<div class="heart"></div>'.repeat(full);
  if (half) html += '<div class="heart half"></div>';
  html += '<div class="heart empty"></div>'.repeat(empty);
  return html;
}
function renderEnergy(energy, maxEnergy) {
  let html = '';
  for (let i = 0; i < maxEnergy; i++) {
    html += `<div class="energy ${i < energy ? 'filled' : ''}"></div>`;
  }
  return html;
}
function renderBuffs(buffs) {
  if (!buffs.length) return '';
  return buffs.map(b => `
    <div class="buff-tag ${b.type}" title="${b.description} (剩余${b.duration}回合)">
      ${b.name}${b.duration>0?`(${b.duration})`:''}
    </div>
  `).join('');
}
function isPlayerAllDead(playerId) {
  return gameState.players[playerId].battleRoles.every(r => r.currentHp <= 0);
}
function getPlayerTotalHp(playerId) {
  return gameState.players[playerId].battleRoles.reduce((sum, r) => sum + r.currentHp, 0);
}

// ==============================
// 选角阶段逻辑
// ==============================
function initRoleSelect() {
  $roleList.innerHTML = '';
  ROLE_LIST.forEach(role => {
    const card = document.createElement('div');
    card.className = 'role-card';
    card.dataset.roleId = role.id;
    card.innerHTML = `
      <img src="${role.avatar}" alt="${role.name}" class="role-avatar">
      <div class="role-name">${role.name}</div>
      <div class="hp-display">${renderHp(role.maxHp, role.maxHp)}</div>
      <div class="energy-display">${renderEnergy(0, role.maxEnergy)}</div>
      <div style="font-size:11px; color:#666; margin-top:5px; line-height:1.3;">
        ${role.skills.map((s,i) => `${i+1}.${s.name}${s.isUltimate?'⚡':''}`).join(' | ')}
      </div>
    `;
    card.addEventListener('click', () => handleRoleSelect(role.id));
    $roleList.appendChild(card);
  });
  $switchSelectPlayer.textContent = `当前配置：玩家${gameState.currentOperatePlayer}`;
  updateSelectedRolesTip();
  updateRoleCardStatus();
}
$switchSelectPlayer.addEventListener('click', () => {
  gameState.currentOperatePlayer = gameState.currentOperatePlayer === 1 ? 2 : 1;
  $switchSelectPlayer.textContent = `当前配置：玩家${gameState.currentOperatePlayer}`;
  updateRoleCardStatus();
  $stageTip.textContent = `请玩家${gameState.currentOperatePlayer}选择参战角色`;
});
function handleRoleSelect(roleId) {
  const curPlayer = gameState.currentOperatePlayer;
  const selected = gameState.players[curPlayer].selectedRoles;
  const otherPlayer = curPlayer === 1 ? 2 : 1;
  if (selected.includes(roleId)) {
    selected.splice(selected.indexOf(roleId), 1);
  } else {
    if (gameState.players[otherPlayer].selectedRoles.includes(roleId)) {
      alert('该角色已被对方选择，请选其他角色');
      return;
    }
    if (selected.length >= GAME_CONFIG.ROLES_PER_PLAYER) {
      alert(`玩家${curPlayer}已选满${GAME_CONFIG.ROLES_PER_PLAYER}个角色`);
      return;
    }
    selected.push(roleId);
  }
  updateSelectedRolesTip();
  updateRoleCardStatus();
  const p1Done = gameState.players[1].selectedRoles.length === GAME_CONFIG.ROLES_PER_PLAYER;
  const p2Done = gameState.players[2].selectedRoles.length === GAME_CONFIG.ROLES_PER_PLAYER;
  $confirmRolesBtn.disabled = !(p1Done && p2Done);
}
function updateSelectedRolesTip() {
  $player1Selected.textContent = `${gameState.players[1].selectedRoles.length}/${GAME_CONFIG.ROLES_PER_PLAYER}`;
  $player2Selected.textContent = `${gameState.players[2].selectedRoles.length}/${GAME_CONFIG.ROLES_PER_PLAYER}`;
}
function updateRoleCardStatus() {
  document.querySelectorAll('.role-card').forEach(card => {
    const roleId = card.dataset.roleId;
    const p1Sel = gameState.players[1].selectedRoles.includes(roleId);
    const p2Sel = gameState.players[2].selectedRoles.includes(roleId);
    const isSelectedByCurPlayer = gameState.currentOperatePlayer === 1 ? p1Sel : p2Sel;
    const isSelectedByOther = gameState.currentOperatePlayer === 1 ? p2Sel : p1Sel;
    card.classList.toggle('selected', isSelectedByCurPlayer);
    if (isSelectedByOther) {
      card.style.borderColor = '#3498db';
      card.style.background = '#e3f2fd';
      card.classList.add('disabled');
    } else if (isSelectedByCurPlayer) {
      card.style.borderColor = '#e74c3c';
      card.style.background = '#ffebee';
      card.classList.remove('disabled');
    } else {
      card.style.borderColor = '#e0e0e0';
      card.style.background = 'white';
      card.classList.remove('disabled');
    }
  });
}
$confirmRolesBtn.addEventListener('click', () => {
  gameState.stage = 'positionSelect';
  $roleSelectSection.style.display = 'none';
  $positionSelectSection.style.display = 'block';
  gameState.currentOperatePlayer = 1;
  $stageTip.textContent = '请玩家1安排角色站位';
  initPositionSelect();
});

// ==============================
// 站位选择阶段
// ==============================
function initPositionSelect() {
  renderPositionSlots(1);
  renderPositionSlots(2);
}
function renderPositionSlots(playerId) {
  const container = playerId === 1 ? $player1Position : $player2Position;
  const slots = container.querySelectorAll('.position-slot');
  const selectedRoles = gameState.players[playerId].selectedRoles;
  slots.forEach(slot => {
    const pos = slot.dataset.position;
    const filledRoleId = gameState.players[playerId].positions[pos];
    if (filledRoleId) {
      const role = ROLE_LIST.find(r => r.id === filledRoleId);
      slot.innerHTML = `<img src="${role.avatar}" class="role-avatar"><div style="font-weight:bold;">${role.name}</div>`;
      slot.classList.add('filled');
    } else {
      slot.textContent = pos === 'left' ? '左侧' : pos === 'center' ? '中路' : '右侧';
      slot.classList.remove('filled');
    }
    slot.onclick = playerId === gameState.currentOperatePlayer ? () => handlePositionSelect(playerId, pos) : null;
  });
  const p1Done = Object.keys(gameState.players[1].positions).length === GAME_CONFIG.ROLES_PER_PLAYER;
  const p2Done = Object.keys(gameState.players[2].positions).length === GAME_CONFIG.ROLES_PER_PLAYER;
  $confirmPositionsBtn.disabled = !(p1Done && p2Done);
  if (p1Done && gameState.currentOperatePlayer === 1) {
    gameState.currentOperatePlayer = 2;
    $stageTip.textContent = '请玩家2安排角色站位';
    renderPositionSlots(2);
  }
}
function handlePositionSelect(playerId, pos) {
  const positions = gameState.players[playerId].positions;
  if (positions[pos]) {
    delete positions[pos];
  } else {
    const unassigned = gameState.players[playerId].selectedRoles.filter(id => !Object.values(positions).includes(id));
    if (unassigned.length) positions[pos] = unassigned[0];
  }
  renderPositionSlots(playerId);
}
$confirmPositionsBtn.addEventListener('click', () => {
  initBattleRoles();
  rollInitiative();
  gameState.stage = 'battle';
  gameState.battleStage = 'waitingP1Action';
  gameState.currentOperatePlayer = 1;
  $positionSelectSection.style.display = 'none';
  $battleSection.style.display = 'block';
  $roundCounter.style.display = 'block';
  $roundCounter.textContent = `第 ${gameState.round} / ${GAME_CONFIG.MAX_ROUND} 回合`;
  $stageTip.textContent = `战斗开始！先手为玩家${gameState.firstPlayer}，第1回合，请玩家1选择要操作的角色`;
  renderBattleField();
  renderSkillList();
});

// ==============================
// 战斗初始化
// ==============================
function initBattleRoles() {
  [1,2].forEach(playerId => {
    const positions = gameState.players[playerId].positions;
    gameState.players[playerId].battleRoles = Object.entries(positions).map(([pos, roleId]) => {
      const template = ROLE_LIST.find(r => r.id === roleId);
      return {
        ...template,
        currentHp: template.maxHp,
        currentEnergy: 0,
        position: pos,
        buffs: [],
        skillCooldowns: [0,0,0],
        damageTakenMultiplier: 1,
        damageDealtMultiplier: 1,
        healTakenMultiplier: 1,
        lifestealMultiplier: 1,
        extraBurnDamage: 0,
        shield: 0,
        hasRevived: false
      };
    });
  });
}
function rollInitiative() {
  const p1Roll = Math.floor(Math.random()*100) + 1;
  const p2Roll = Math.floor(Math.random()*100) + 1;
  gameState.firstPlayer = p1Roll >= p2Roll ? 1 : 2;
  alert(`先后手判定：玩家1 ${p1Roll} vs 玩家2 ${p2Roll}，玩家${gameState.firstPlayer}先手！`);
}

// ==============================
// 战斗渲染逻辑
// ==============================
function renderBattleField() {
  renderPlayerBattleRoles(1, $player1Side.querySelector('.role-cards'));
  renderPlayerBattleRoles(2, $player2Side.querySelector('.role-cards'));
  $currentPlayerTip.textContent = `当前回合：等待玩家${gameState.currentOperatePlayer}操作`;
}
function renderPlayerBattleRoles(playerId, container) {
  const roles = gameState.players[playerId].battleRoles;
  container.innerHTML = '';
  roles.forEach(role => {
    const card = document.createElement('div');
    card.className = `battle-role-card ${role.currentHp <=0 ? 'dead' : ''}`;
    card.dataset.roleId = role.id;
    card.dataset.playerId = playerId;
    card.innerHTML = `
      <div class="position-tag">${role.position === 'left' ? '左' : role.position === 'center' ? '中' : '右'}</div>
      <img src="${role.avatar}" class="role-avatar">
      <div class="role-name">${role.name}</div>
      <div class="hp-display">${renderHp(role.currentHp, role.maxHp)}</div>
      <div class="energy-display">${renderEnergy(role.currentEnergy || 0, role.maxEnergy)}</div>
      ${role.shield > 0 ? `<div style="font-size:12px; color:#3498db; margin-top:3px;">🛡️ ${role.shield.toFixed(1)}心</div>` : ''}
      <div class="buff-list">${renderBuffs(role.buffs)}</div>
      ${role.skillCooldowns.some(cd=>cd>0) ? `<div style="font-size:10px; color:#666; margin-top:5px;">冷却：${role.skillCooldowns.map((cd,idx)=>cd>0?`技能${idx+1}:${cd}`:'').filter(Boolean).join(' ')}</div>` : ''}
    `;
    if (gameState.selectingTarget) {
      const targetable = checkTargetable(gameState.selectedSkill.targetType, playerId, role);
      if (targetable) {
        card.classList.add('targetable');
        card.addEventListener('click', () => handleTargetSelect(role, playerId));
      }
    }
    if (!gameState.selectingTarget && playerId === gameState.currentOperatePlayer && role.currentHp>0) {
      card.addEventListener('click', () => handleOperateRoleSelect(role));
    }
    container.appendChild(card);
  });
}
function handleOperateRoleSelect(role) {
  gameState.selectedRole = role;
  document.querySelectorAll('.battle-role-card').forEach(c => c.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  renderSkillList();
}
function renderSkillList() {
  $skillList.innerHTML = '';
  if (!gameState.selectedRole) {
    $skillList.innerHTML = '<div style="grid-column:1/-1; color:#999; text-align:center; padding:20px;">请先选择你要操作的角色</div>';
    return;
  }
  gameState.selectedRole.skills.forEach((skill, idx) => {
    const cd = gameState.selectedRole.skillCooldowns[idx];
    const isSilenced = gameState.selectedRole.buffs.some(b => b.id === 'silence');
    const canUseUltimate = skill.isUltimate ? (gameState.selectedRole.currentEnergy || 0) >= skill.energyCost : true;
    const disabled = cd > 0 || (isSilenced && idx > 0) || (skill.isUltimate && !canUseUltimate);
    const card = document.createElement('div');
    card.className = `skill-card ${disabled ? 'disabled' : ''} ${skill.isUltimate ? 'skill-ultimate' : ''}`;
    card.innerHTML = `
      <div class="skill-name">${skill.name}${skill.isUltimate?` (${skill.energyCost}⚡)`:''}</div>
      <div class="skill-desc">${skill.description}</div>
      ${cd>0 ? `<div class="skill-cooldown">冷却中：${cd}回合</div>` : ''}
      ${skill.isUltimate && !canUseUltimate && cd===0 ? `<div class="skill-cooldown">充能不足</div>` : ''}
      ${isSilenced && idx>0 && cd===0 ? `<div class="skill-cooldown">已沉默</div>` : ''}
    `;
    if (!disabled) card.addEventListener('click', () => handleSkillSelect(skill, idx));
    $skillList.appendChild(card);
  });
}
function handleSkillSelect(skill, idx) {
  gameState.selectedSkill = skill;
  gameState.selectedSkillIndex = idx;
  gameState.selectingTarget = true;
  $targetSelectTip.style.display = 'block';
  $targetSelectTip.textContent = `请选择技能「${skill.name}」的目标`;
  renderBattleField();
}
function checkTargetable(targetType, targetPlayerId, role) {
  const curPlayer = gameState.currentOperatePlayer;
  const enemyHasTaunt = gameState.players[curPlayer === 1 ? 2 : 1].battleRoles.some(r => r.currentHp>0 && r.buffs.some(b => b.id === 'taunt'));
  if (enemyHasTaunt && targetType === 'enemy' && !role.buffs.some(b => b.id === 'taunt')) {
    return false;
  }
  if (role.buffs.some(b => b.id === 'invisibility') && (targetType === 'enemy' || targetType === 'ally') && targetType !== 'allEnemy' && targetType !== 'allAlly') {
    return false;
  }
  switch(targetType) {
    case 'enemy': return targetPlayerId !== curPlayer && role.currentHp>0;
    case 'ally': return targetPlayerId === curPlayer && role.currentHp>0;
    case 'self': return targetPlayerId === curPlayer && role.id === gameState.selectedRole.id;
    case 'allEnemy': return targetPlayerId !== curPlayer && role.currentHp>0;
    case 'allAlly': return targetPlayerId === curPlayer && role.currentHp>0;
    default: return false;
  }
}

// ==============================
// 核心：操作处理与结算
// ==============================
function handleTargetSelect(target, targetPlayerId) {
  const skill = gameState.selectedSkill;
  const caster = gameState.selectedRole;
  let targets = [];

  // 整理目标列表（和原逻辑一致，处理群体/混乱）
  if (skill.targetType === 'allEnemy') {
    targets = gameState.players[targetPlayerId === 1 ? 2 : 1].battleRoles.filter(r => r.currentHp>0);
  } else if (skill.targetType === 'allAlly') {
    targets = gameState.players[gameState.currentOperatePlayer].battleRoles.filter(r => r.currentHp>0);
  } else {
    if (caster.buffs.some(b => b.id === 'confusion')) {
      const allAlive = [
        ...gameState.players[1].battleRoles.filter(r => r.currentHp>0),
        ...gameState.players[2].battleRoles.filter(r => r.currentHp>0)
      ];
      targets = [allAlive[Math.floor(Math.random() * allAlive.length)]];
    } else {
      targets = [target];
    }
  }

  // 存储当前玩家的操作
  gameState.pendingActions[gameState.currentOperatePlayer] = {
    caster: caster,
    skill: skill,
    skillIndex: gameState.selectedSkillIndex,
    targets: targets
  };

  // 重置选择状态
  gameState.selectingTarget = false;
  gameState.selectedRole = null;
  gameState.selectedSkill = null;
  gameState.selectedSkillIndex = null;
  $targetSelectTip.style.display = 'none';

  // 判断是否双方都操作完成
  if (gameState.currentOperatePlayer === 1) {
    // 切到玩家2操作
    gameState.currentOperatePlayer = 2;
    $stageTip.textContent = `第${gameState.round}回合，请玩家2选择要操作的角色`;
    renderBattleField();
    renderSkillList();
  } else {
    // 双方都操作完成，进入结算
    settleRound();
  }
}

// 执行单个操作的技能效果
function executeAction(action) {
  const { caster, skill, skillIndex, targets } = action;
  gameState.lastAttacker = caster;

  targets.forEach(t => {
    // 闪避处理
    if (t.buffs.some(b => b.id === 'dodge') && skill.targetType !== 'allEnemy' && skill.targetType !== 'allAlly') {
      alert(`${t.name} 闪避了${caster.name}的技能！`);
      t.buffs = t.buffs.filter(b => b.id !== 'dodge');
      return;
    }

    const effect = skill.effect(t, caster);
    let damage = effect.damage;

    // 伤害计算
    if (damage > 0) {
      damage *= caster.damageDealtMultiplier;
      // 暴击增幅处理
      if (caster.buffs.some(b => b.id === 'critBoost')) {
        damage *= 2;
        caster.buffs = caster.buffs.filter(b => b.id !== 'critBoost');
      }
      // 致命标记处理
      if (t.buffs.some(b => b.id === 'mark')) {
        damage *= 2;
        t.buffs = t.buffs.filter(b => b.id !== 'mark');
      }
      // 灼烧额外伤害
      damage += (caster.extraBurnDamage || 0);
      // 护盾吸收
      if (t.shield > 0) {
        const absorb = Math.min(t.shield, damage);
        t.shield -= absorb;
        damage -= absorb;
      }
      // 伤害减免
      damage *= t.damageTakenMultiplier;
      // 反伤处理
      const reflectBuff = t.buffs.find(b => b.id === 'reflect');
      if (reflectBuff && reflectBuff.onHit) {
        const reflectResult = reflectBuff.onHit(t, damage);
        if (reflectResult && reflectResult.targetType === 'lastAttacker' && gameState.lastAttacker) {
          gameState.lastAttacker.currentHp = Math.max(0, gameState.lastAttacker.currentHp - reflectResult.damage);
          alert(`${gameState.lastAttacker.name} 受到了 ${reflectResult.damage.toFixed(1)} 点反伤！`);
        }
      }
      // 最终扣血
      t.currentHp = Math.max(0, t.currentHp - damage);
      if (damage > 0) {
        alert(`${caster.name}对${t.name}造成${damage.toFixed(1)}点伤害！`);
      }
    } else if (damage < 0) {
      // 治疗计算
      let heal = -damage;
      heal *= t.healTakenMultiplier;
      t.currentHp = Math.min(t.maxHp, t.currentHp + heal);
      alert(`${caster.name}为${t.name}恢复${heal.toFixed(1)}点血量！`);
    }

    // 添加Buff处理
    if (effect.buff) {
      const buffs = Array.isArray(effect.buff) ? effect.buff : [effect.buff];
      buffs.forEach(buffTemp => {
        if (!buffTemp) return;
        const buff = {...buffTemp};
        if (buff.effect) buff.effect(t);
        if (buff.onDeath) {
          t.buffs.push(buff);
          alert(`${caster.name}给${t.name}附加「${buff.name}」！`);
        } else if (buff.duration > 0) {
          const existing = t.buffs.find(b => b.id === buff.id);
          existing ? existing.duration = buff.duration : t.buffs.push(buff);
          alert(`${caster.name}给${t.name}附加「${buff.name}」，持续${buff.duration}回合！`);
        } else if (buff.id === 'cleanse') {
          t.buffs = t.buffs.filter(b => b.type === 'buff');
          alert(`${caster.name}为${t.name}清除了所有Debuff！`);
        }
      });
    }
  });

  // 能量和冷却处理
  if (!skill.isUltimate && skill.energyGain) {
    caster.currentEnergy = Math.min(caster.maxEnergy, (caster.currentEnergy || 0) + skill.energyGain);
  }
  if (skill.isUltimate && skill.energyCost) {
    caster.currentEnergy = (caster.currentEnergy || 0) - skill.energyCost;
  }
  caster.skillCooldowns[skillIndex] = skill.cooldown;
}

// 回合结算
function settleRound() {
  // 按先手顺序结算技能
  const actionOrder = gameState.firstPlayer === 1 ? [1, 2] : [2, 1];
  actionOrder.forEach(playerId => {
    const action = gameState.pendingActions[playerId];
    if (action) executeAction(action);
  });

  // 处理回合结束：Buff递减、冷却递减
  processRoundEnd();

  // 检查游戏结束
  if (checkGameEnd()) return;

  // 超过最大回合限制
  if (gameState.round > GAME_CONFIG.MAX_ROUND) {
    handleRoundLimitEnd();
    return;
  }

  // 进入下一个回合
  gameState.round++;
  $roundCounter.textContent = `第 ${gameState.round} / ${GAME_CONFIG.MAX_ROUND} 回合`;
  gameState.pendingActions = {1: null, 2: null};
  gameState.currentOperatePlayer = 1;
  $stageTip.textContent = `第${gameState.round}回合，请玩家1选择要操作的角色`;
  renderBattleField();
  renderSkillList();
}

// 处理回合结束的Buff和冷却
function processRoundEnd() {
  [1, 2].forEach(playerId => {
    gameState.players[playerId].battleRoles.forEach(role => {
      // 先触发所有Buff的回合结束效果
      role.buffs.forEach(buff => {
        if (buff.onTurnEnd) buff.onTurnEnd(role);
      });
      // 减少持续时间，移除过期Buff
      role.buffs.forEach(buff => buff.duration--);
      role.buffs = role.buffs.filter(buff => b.duration > 0);
      // 重置每回合属性乘数
      role.damageTakenMultiplier = 1;
      role.damageDealtMultiplier = 1;
      role.healTakenMultiplier = 1;
      role.lifestealMultiplier = 1;
      role.extraBurnDamage = 0;
      // 冷却减少1
      role.skillCooldowns = role.skillCooldowns.map(cd => Math.max(0, cd - 1));
      // 重新应用当前Buff的效果
      role.buffs.forEach(buff => {
        if (buff.effect) buff.effect(role);
      });
    });
  });
}

// ==============================
// 胜负判定
// ==============================
function checkGameEnd() {
  // 处理复活
  [1,2].forEach(playerId => {
    gameState.players[playerId].battleRoles.forEach(role => {
      if (role.currentHp <= 0) {
        const lastStand = role.buffs.find(b => b.id === 'lastStand');
        if (lastStand && lastStand.onDeath) {
          const revived = lastStand.onDeath(role);
          if (revived) {
            alert(`${role.name} 触发了「回光返照」复活了！`);
            // 复活后重新应用Buff效果
            role.buffs.forEach(buff => {
              if (buff.effect) buff.effect(role);
            });
          }
        }
      }
    });
  });

  const p1Dead = isPlayerAllDead(1);
  const p2Dead = isPlayerAllDead(2);
  if (p1Dead && p2Dead) {
    showResult('平局！', '双方角色全部阵亡');
    return true;
  } else if (p1Dead) {
    showResult('玩家2获胜！', '玩家1所有角色被击败');
    return true;
  } else if (p2Dead) {
    showResult('玩家1获胜！', '玩家2所有角色被击败');
    return true;
  }
  return false;
}

function handleRoundLimitEnd() {
  const p1Hp = getPlayerTotalHp(1);
  const p2Hp = getPlayerTotalHp(2);
  if (p1Hp > p2Hp) {
    showResult('玩家1获胜！', `${GAME_CONFIG.MAX_ROUND}回合结束，玩家1剩余${p1Hp.toFixed(1)}心，玩家2剩余${p2Hp.toFixed(1)}心`);
  } else if (p2Hp > p1Hp) {
    showResult('玩家2获胜！', `${GAME_CONFIG.MAX_ROUND}回合结束，玩家2剩余${p2Hp.toFixed(1)}心，玩家1剩余${p1Hp.toFixed(1)}心`);
  } else {
    showResult('平局！', `${GAME_CONFIG.MAX_ROUND}回合结束，双方剩余血量相同`);
  }
}

function showResult(title, desc) {
  $resultText.textContent = title;
  $resultDesc.textContent = desc;
  $resultModal.style.display = 'flex';
}

// 重启游戏
$restartBtn.addEventListener('click', () => {
  gameState = {
    stage: 'roleSelect',
    currentOperatePlayer: 1,
    round: 1,
    players: {
      1: { selectedRoles: [], positions: {}, battleRoles: [] },
      2: { selectedRoles: [], positions: {}, battleRoles: [] }
    },
    firstPlayer: null,
    battleStage: 'waitingAction',
    pendingActions: { 1: null, 2: null },
    selectedRole: null,
    selectedSkill: null,
    selectedSkillIndex: null,
    selectingTarget: false,
    lastAttacker: null
  };
  $resultModal.style.display = 'none';
  $battleSection.style.display = 'none';
  $roundCounter.style.display = 'none';
  $roleSelectSection.style.display = 'block';
  $stageTip.textContent = '请玩家1选择参战角色';
  initRoleSelect();
});

// 初始化游戏
initRoleSelect();
