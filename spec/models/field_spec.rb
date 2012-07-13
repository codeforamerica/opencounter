require 'spec_helper'

describe Field do
  it { should have_many(:answers) }
  it { should have_and_belong_to_many(:forms) }
end
