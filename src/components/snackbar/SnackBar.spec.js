import { shallowMount } from '@vue/test-utils';
import SnackBar from './SnackBar.vue';
jest.useFakeTimers();

describe('Snackbar', () => {
  let wrapper, spy;
  beforeEach(() => {
    wrapper = shallowMount(SnackBar);
    spy = jest.spyOn(wrapper.vm, 'setSnackTimeout');
  });

  afterEach(() => {
    spy.mockClear();
  });

  it('should set showSnack to false on timeout', () => {
    wrapper.vm.setSnackTimeout();
    jest.runOnlyPendingTimers();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    expect(wrapper.vm.showSnack).toBeFalsy();
  });

  it('should set showSnack to true and call timeout function when notify changes', (done) => {
    wrapper.setProps({ notifyMsg: 'New text' });
    wrapper.vm.$nextTick(() => {
      expect(spy).toBeCalled();
      done();
    });
  })
});