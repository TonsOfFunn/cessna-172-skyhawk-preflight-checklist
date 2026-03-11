/**
 * Cessna 172 Pre-Flight Checklist — state, persistence, section toggles
 * Progress is stored in sessionStorage so it persists during the tab session
 * but resets when the tab is closed (first visit = blank checklist).
 */

const STORAGE_KEY = 'c172-preflight';

const sections = {
  interior: { total: 18, badge: 'badge-interior', list: 'interior-list', btn: 'btn-interior' },
  exterior: { total: 24, badge: 'badge-exterior', list: 'exterior-list', btn: 'btn-exterior' },
  engine:   { total: 12, badge: 'badge-engine',   list: 'engine-list',   btn: 'btn-engine' },
};

function getState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

function collectCheckboxState() {
  const state = {};
  document.querySelectorAll('.checklist input[type="checkbox"]').forEach((input) => {
    const id = input.getAttribute('data-id');
    if (id) state[id] = input.checked;
  });
  return state;
}

function applyCheckboxState(state) {
  Object.entries(state).forEach(([id, checked]) => {
    const input = document.querySelector(`.checklist input[data-id="${id}"]`);
    if (input) input.checked = !!checked;
  });
}

function updateBadgesAndProgress() {
  const state = collectCheckboxState();
  saveState(state);

  let totalChecked = 0;
  let totalItems = 0;

  Object.entries(sections).forEach(([key, cfg]) => {
    const list = document.getElementById(cfg.list);
    if (!list) return;
    const inputs = list.querySelectorAll('input[type="checkbox"]');
    const checked = Array.from(inputs).filter((i) => i.checked).length;
    totalChecked += checked;
    totalItems += inputs.length;

    const badge = document.getElementById(cfg.badge);
    if (badge) badge.textContent = `${checked}/${cfg.total}`;

    const section = list.closest('.section');
    if (section) section.setAttribute('data-complete', checked === cfg.total ? 'true' : 'false');
  });

  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const progressWrap = document.querySelector('.progress');
  const pct = totalItems ? Math.round((totalChecked / totalItems) * 100) : 0;
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (progressText) progressText.textContent = `${pct}%`;
  if (progressWrap) progressWrap.setAttribute('aria-valuenow', String(pct));

  const header = document.getElementById('header');
  const completeEl = document.getElementById('checklistComplete');
  if (header && completeEl) {
    if (pct === 100) {
      header.classList.add('is-complete');
      completeEl.setAttribute('aria-hidden', 'false');
    } else {
      header.classList.remove('is-complete');
      completeEl.setAttribute('aria-hidden', 'true');
    }
  }
}

function setupSectionToggles() {
  Object.values(sections).forEach((cfg) => {
    const btn = document.getElementById(cfg.btn);
    const list = document.getElementById(cfg.list);
    const section = list?.closest('.section');
    if (!btn || !list || !section) return;

    btn.addEventListener('click', () => {
      const expanded = section.getAttribute('aria-expanded') !== 'true';
      section.setAttribute('aria-expanded', expanded);
      btn.setAttribute('aria-expanded', expanded);
    });
  });
}

function setupCheckboxes() {
  document.querySelectorAll('.checklist input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', updateBadgesAndProgress);
  });
}

function resetChecklist() {
  if (!confirm('Reset entire checklist? All items will be unchecked.')) return;
  document.querySelectorAll('.checklist input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });
  saveState({});
  updateBadgesAndProgress();
}

function init() {
  applyCheckboxState(getState());
  updateBadgesAndProgress();
  setupSectionToggles();
  setupCheckboxes();

  const btnReset = document.getElementById('btnReset');
  if (btnReset) btnReset.addEventListener('click', resetChecklist);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
