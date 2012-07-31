require 'spec_helper'

describe Form do
  it { should have_and_belong_to_many(:fields) }
end
